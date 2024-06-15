export default function cachedPromise<T extends (...arguments_: any[]) => any>(
  function_: T,
) {
  let p: ReturnType<T>;
  return (...arguments_: Parameters<T>) => {
    if (p) {
      return p;
    }
    p = Promise.resolve(function_(...arguments_)) as ReturnType<T>;
    return p;
  };
}
