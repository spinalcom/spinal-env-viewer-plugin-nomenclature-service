"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spinalNomenclatureService = void 0;
const NomenclatureTree_1 = require("./modules/NomenclatureTree");
const Profil_1 = require("./modules/Profil");
const globalType = typeof window === "undefined" ? global : window;
function applyMixins(derivedConstructor, baseConstructors) {
    baseConstructors.forEach(baseConstructor => {
        Object.getOwnPropertyNames(baseConstructor.prototype)
            .forEach(name => {
            Object.defineProperty(derivedConstructor.prototype, name, Object.
                getOwnPropertyDescriptor(baseConstructor.prototype, name));
        });
    });
}
class SpinalNomenclatureService {
}
;
;
applyMixins(SpinalNomenclatureService, [NomenclatureTree_1.NomenclatureTree, Profil_1.NomenclatureProfil]);
const spinalNomenclatureService = new SpinalNomenclatureService();
exports.spinalNomenclatureService = spinalNomenclatureService;
globalType.spinalNomenclatureService = spinalNomenclatureService;
exports.default = spinalNomenclatureService;
//# sourceMappingURL=index.js.map