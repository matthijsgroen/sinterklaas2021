import React, { useRef, useEffect } from "react";
import styles from "./CombatView.module.css";
import {
  AnimationControls,
  GeppettoPlayer,
  ImageDefinition,
  prepareAnimation,
  setupWebGL,
} from "geppetto-player";
import { useAppSelector } from "../state/hooks";
import {
  CombatCreature,
  CombatStatus,
  selectCombatLog,
  selectCombatStatus,
} from "../state/combatSlice";
import { MutableRefObject } from "hoist-non-react-statics/node_modules/@types/react";
import { ActionSentence, ActionType } from "../types";
import creatures, { genericCombatTexture } from "../data/creatures";
import backgroundAnimation from "../data/geppetto/background.json";

type AnimationAdministration = Record<
  string,
  {
    controls: AnimationControls;
    stateTrack: string;
    current: string;
  }
>;
const background = prepareAnimation(
  backgroundAnimation as unknown as ImageDefinition
);

const synchronizeAnimations = (
  combatStatus: CombatStatus,
  animationsRef: MutableRefObject<AnimationAdministration>,
  player: GeppettoPlayer
) => {
  const checkSetup = async (creature: CombatCreature, index: number) => {
    if (creature.health <= 0) return;
    if (!animationsRef.current[creature.id]) {
      const img = await creature.card.texture;

      const animation = player.addAnimation(creature.card.animation, img, 0, {
        panX:
          creature.party === "left" ? -0.4 + index * -0.1 : 0.3 + index * 0.15,
        panY: 0.2 + index * -0.2,
        zoom: 1.5,
        zIndex: 2 + index,
      });
      animation.startTrack("idle");
      animationsRef.current[creature.id] = {
        controls: animation,
        stateTrack: "idle",
        current: "idle",
      };
      animation.onTrackStopped((track) => {
        if (track !== "idle" && track !== "stunned" && track !== "dead") {
          const stateTrack = animationsRef.current[creature.id].stateTrack;
          animationsRef.current[creature.id].current = stateTrack;
          animation.startTrack(stateTrack);
        }
        if (track === "dead") {
          animation.destroy();
          delete animationsRef.current[creature.id];
        }
      });
    } else {
      if (creature.cooldowns["stunned"]) {
        animationsRef.current[creature.id].stateTrack = "stunned";
      } else {
        animationsRef.current[creature.id].stateTrack = "idle";
      }
    }
  };
  combatStatus.partyA.forEach(checkSetup);
  combatStatus.partyB.forEach(checkSetup);
};

const trackMapping: Record<ActionType, string> = {
  heals: "healing",
  hurts: "hurt",
  stuns: "stunned",
};

const getAnimationStates = (log: ActionSentence[]): Record<string, string> => {
  const states: Record<string, string> = {};
  log.forEach((entry) => {
    const sourceCard = creatures[entry.source.card];
    const sourceAction = sourceCard.actions.find((a) => a.name === entry.with);
    if (sourceAction && sourceAction.animationTrack) {
      if (sourceAction.animationTrack.target === "self") {
        states[entry.source.id] = sourceAction.animationTrack.track;
      }
      if (sourceAction.animationTrack.target === "environment") {
        states["background"] = sourceAction.animationTrack.track;
      }
    }

    states[entry.target.id] =
      states[entry.target.id] || trackMapping[entry.action];

    if (entry.target.health <= 0) {
      states[entry.target.id] = "dead";
    }
  });

  return states;
};

const CombatView: React.FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<GeppettoPlayer | null>(null);
  const animationsRef = useRef<AnimationAdministration>({});

  useEffect(() => {
    const resizeHandler = () => {
      if (!canvasRef.current) return;

      const { width, height } = canvasRef.current?.getBoundingClientRect();
      canvasRef.current.width = width * devicePixelRatio;
      canvasRef.current.height = height * devicePixelRatio;
    };

    resizeHandler();

    if (canvasRef.current) {
      const player = setupWebGL(canvasRef.current);
      playerRef.current = player;

      const setupBackground = async () => {
        const img = await genericCombatTexture;

        const controls = player.addAnimation(background, img, 0, {
          panX: 0,
          zoom: 4.5,
        });
        animationsRef.current["background"] = {
          controls,
          stateTrack: "",
          current: "",
        };
      };
      setupBackground();

      const render = () => {
        if (playerRef.current === null) return;

        playerRef.current.render();

        animationsRef.current["background"] &&
          animationsRef.current["background"].controls.render();

        Object.entries(animationsRef.current).forEach(([key, creature]) => {
          if (key !== "background") creature.controls.render();
        });

        window.requestAnimationFrame(render);
      };

      window.requestAnimationFrame(render);
    }

    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const animations = animationsRef.current;
      const player = playerRef.current;
      playerRef.current = null;

      player?.destroy();
      Object.values(animations).forEach((creature) => {
        creature.controls.destroy();
      });
    };
  }, []);

  const combatStatus = useAppSelector(selectCombatStatus);
  const combatLog = useAppSelector(selectCombatLog);

  useEffect(() => {
    if (!playerRef.current) return;
    synchronizeAnimations(combatStatus, animationsRef, playerRef.current);
    const animationStates = getAnimationStates(combatLog);

    Object.entries(animationStates).forEach(([animationId, track]) => {
      if (
        animationsRef.current[animationId] &&
        animationsRef.current[animationId].current !== track
      ) {
        animationsRef.current[animationId].current = track;
        animationsRef.current[animationId].controls.startTrack(track);
      }
    });
  }, [combatStatus, combatLog]);

  return <canvas className={styles.arena} ref={canvasRef} />;
};

export default CombatView;
