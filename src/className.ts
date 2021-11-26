const className = (classNames: Record<string, boolean>): string =>
  Object.entries(classNames)
    .reduce(
      (result, [key, value]) => (value ? result.concat(key) : result),
      [] as string[]
    )
    .join(" ");

export default className;
