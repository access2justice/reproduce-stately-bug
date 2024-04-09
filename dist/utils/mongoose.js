"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dotNotationResolution = exports.resolveKey = exports.previousValuesFromMongooseUpdate = void 0;
const previousValuesFromMongooseUpdate = (update, previousData) => {
    try {
        const previousValues = {};
        Object.keys(update).forEach((k) => {
            (0, exports.resolveKey)(k, update[k], previousData, previousValues);
        });
        return previousValues;
    }
    catch (e) {
        return {};
    }
};
exports.previousValuesFromMongooseUpdate = previousValuesFromMongooseUpdate;
const resolveKey = (key, value, source, resultObject) => {
    if (key.includes('.')) {
        (0, exports.dotNotationResolution)(key, source, resultObject);
    }
    else if (key === '$unset') {
        Object.keys(value).forEach((k) => {
            return (0, exports.resolveKey)(k, value[k], source, resultObject);
        });
    }
    else {
        resultObject = Object.assign(resultObject || {}, {
            [key]: source[key],
        });
    }
    return resultObject;
};
exports.resolveKey = resolveKey;
const dotNotationResolution = (s, sourceObject, resultObject) => {
    const path = s.split('.');
    let write = resultObject;
    let source = sourceObject;
    for (let i = 0; i < path.length; i++) {
        if (i < path.length - 1) {
            write[path[i]] = write[path[i]] || {};
            write = write[path[i]];
            source = source[path[i]];
        }
        else {
            write = Object.assign(write, { [path[i]]: source[path[i]] });
        }
    }
    return resultObject;
};
exports.dotNotationResolution = dotNotationResolution;
//# sourceMappingURL=mongoose.js.map