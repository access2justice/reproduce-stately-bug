import { UpdateQuery } from 'mongoose';

export const previousValuesFromMongooseUpdate = <Model>(
  update: UpdateQuery<Model>,
  previousData: Model,
): Partial<Model> => {
  try {
    const previousValues = {} as Partial<Model>;

    Object.keys(update).forEach((k: string) => {
      resolveKey(k, update[k], previousData as any, previousValues);
    });

    return previousValues;
  } catch (e) {
    return {};
  }
};

export const resolveKey = (
  key: string,
  value: any,
  source: object,
  resultObject: object,
) => {
  if (key.includes('.')) {
    dotNotationResolution(key, source, resultObject);
  } else if (key === '$unset') {
    Object.keys(value).forEach((k) => {
      return resolveKey(k, value[k], source, resultObject);
    });
  } else {
    resultObject = Object.assign(resultObject || {}, {
      [key]: (source as any)[key],
    });
  }

  return resultObject;
};

export const dotNotationResolution = (
  s: string,
  sourceObject: object,
  resultObject: object,
) => {
  const path = s.split('.');

  let write = resultObject as any;
  let source = sourceObject as any;

  for (let i = 0; i < path.length; i++) {
    if (i < path.length - 1) {
      write[path[i]] = write[path[i]] || {};
      write = write[path[i]];
      source = source[path[i]];
    } else {
      write = Object.assign(write, { [path[i]]: source[path[i]] });
    }
  }

  return resultObject;
};
