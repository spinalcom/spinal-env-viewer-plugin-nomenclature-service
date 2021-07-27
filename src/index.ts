import { NomenclatureTree } from "./modules/NomenclatureTree";
import { NomenclatureProfil } from "./modules/Profil";

const globalType: any = typeof window === "undefined" ? global : window;

function applyMixins(derivedConstructor: any, baseConstructors: any[]) {
   baseConstructors.forEach(baseConstructor => {
       Object.getOwnPropertyNames(baseConstructor.prototype)
           .forEach(name => {
               Object.defineProperty(derivedConstructor.prototype,
                   name,
                   Object.
                       getOwnPropertyDescriptor(
                           baseConstructor.prototype,
                           name
                       )
               );
           });
   });
}

class SpinalNomenclatureService {};

interface SpinalNomenclatureService extends NomenclatureProfil, NomenclatureTree {};

applyMixins(SpinalNomenclatureService,[NomenclatureTree, NomenclatureProfil]);

const spinalNomenclatureService = new SpinalNomenclatureService();

globalType.spinalNomenclatureService = spinalNomenclatureService;

export {spinalNomenclatureService};

export default spinalNomenclatureService;
