#!/bin/bash

# When new asset packs are released, these numbers are increased...

NUMBER=21
FILE=kenney_platformerkit
if [ ! -f "bin/$FILE.zip" ]; then
    curl -o "bin/$FILE.zip" "https://kenney.nl/content/3-assets/$NUMBER-platformer-kit/kenney_platformerkit2.zip"
fi
unzip -u -d "public/images/$FILE" "bin/$FILE.zip" Isometric/*

NUMBER=49
FILE=kenney_furniturekit
if [ ! -f "bin/$FILE.zip" ]; then
    curl -o "bin/$FILE.zip" "https://kenney.nl/content/3-assets/$NUMBER-furniture-kit/furniturekit_updated.zip"
fi
unzip -u -d "public/images/$FILE" "bin/$FILE.zip" Isometric/*

NUMBER=42
FILE=kenney_fantasytownkit
if [ ! -f "bin/$FILE.zip" ]; then
    curl -o "bin/$FILE.zip" "https://kenney.nl/content/3-assets/$NUMBER-fantasy-town-kit/fantasy-town-kit-1.0.zip"
fi
unzip -u -d "public/images/$FILE" "bin/$FILE.zip" Isometric/*
