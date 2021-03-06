"use strict";
/*
 * Copyright 2022 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
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
    constructor() {
        this.profileNodeType = "AttributeConfiguration";
        this.defaultContextName = "NomenclatureConfiguration";
    }
}
;
;
applyMixins(SpinalNomenclatureService, [NomenclatureTree_1.NomenclatureTree, Profil_1.NomenclatureProfil]);
const spinalNomenclatureService = new SpinalNomenclatureService();
exports.spinalNomenclatureService = spinalNomenclatureService;
globalType.spinalNomenclatureService = spinalNomenclatureService;
exports.default = spinalNomenclatureService;
//# sourceMappingURL=index.js.map