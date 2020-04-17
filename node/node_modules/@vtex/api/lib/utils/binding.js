"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BindingHeaderFormat;
(function (BindingHeaderFormat) {
    BindingHeaderFormat["webframework0"] = "v0+webframework";
    BindingHeaderFormat["kuberouter0"] = "v0+kuberouter";
})(BindingHeaderFormat || (BindingHeaderFormat = {}));
exports.formatBindingHeaderValue = (binding, format = BindingHeaderFormat.webframework0) => {
    if (format === BindingHeaderFormat.webframework0) {
        const jsonString = JSON.stringify(binding);
        return Buffer.from(jsonString, 'utf8').toString('base64');
    }
    if (format === BindingHeaderFormat.kuberouter0) {
        return [
            '0',
            binding.id || '',
            binding.rootPath || '',
            binding.locale || '',
            binding.currency || '',
        ].join(',');
    }
    throw new Error(`Unkown binding format: ${format}`);
};
exports.parseBindingHeaderValue = (value) => {
    if (value[0] === '0' && value[1] === ',') {
        // v0+kuberouter
        const [, id, rootPath, locale, currency] = value.split(',');
        return {
            currency: currency || undefined,
            id: id || undefined,
            locale,
            rootPath: rootPath || undefined,
        };
    }
    // v0+webframework
    const jsonString = Buffer.from(value, 'base64').toString('utf8');
    return JSON.parse(jsonString);
};
