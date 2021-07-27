"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NomenclatureTree = void 0;
const spinal_env_viewer_plugin_group_manager_service_1 = require("spinal-env-viewer-plugin-group-manager-service");
const spinal_env_viewer_graph_service_1 = require("spinal-env-viewer-graph-service");
class NomenclatureTree {
    constructor() {
        this.profileNodeType = "AttributeConfiguration";
        this.defaultContextName = "NomenclatureConfiguration";
    }
    /**
     * This method takes a context name as a parameter (not required),
     * If no name is passed it creates or returns the default context (NomenclatureConfiguration)
     * @param contextName - string - not required
     * @returns Promise<SpinalContext>
     */
    createOrGetContext(contextName) {
        if (!contextName || contextName.trim().length === 0)
            contextName = this.defaultContextName;
        return spinal_env_viewer_plugin_group_manager_service_1.groupManagerService.createGroupContext(contextName.trim(), this.profileNodeType);
    }
    /**
     * This method returns a context (if contextName or id is passed) or all profil contexts
     * @param contextName - string - contextName not required
     * @returns Promise<SpinalContext | SpinalContext[]>
     */
    getContexts(contextName) {
        return __awaiter(this, void 0, void 0, function* () {
            const contexts = yield spinal_env_viewer_plugin_group_manager_service_1.groupManagerService.getGroupContexts(this.profileNodeType);
            if (contextName && contextName.trim().length > 0) {
                const context = contexts.filter(el => el.name === contextName || el.id === contextName);
                return spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode(context === null || context === void 0 ? void 0 : context.id);
            }
            return contexts.map(el => spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode(el === null || el === void 0 ? void 0 : el.id));
        });
    }
    /**
     * This method updates a contextName, it takes as parameter two strings (contextId and context new Name)
     * @param contextId - string - the context id
     * @param newName  - string - new context name
     * @returns SpinalContext
     */
    updateContext(contextId, newName) {
        const spinalContext = spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode(contextId);
        if (!spinalContext || !(spinalContext instanceof spinal_env_viewer_graph_service_1.SpinalContext) || spinalContext.getType().get() !== `${this.profileNodeType}GroupContext`)
            throw new Error(`${contextId} must be an id of profil SpinalContext`);
        if (typeof newName !== "string" || newName.trim().length === 0)
            throw new Error("newName is required and must be a string at less 1 character");
        spinalContext.info.name.set(newName.trim());
        return spinalContext;
    }
    /**
     * This method creates and links category to a profil context, it takes as parameters contextName, iconName (not required) and contextId (not required)
     * @param categoryName - string (required)
     * @param iconName - string (not required default value = settings)
     * @param contextId - string (not required default value = default contextId)
     * @returns Promise<SpinalNode>
     */
    createCategory(categoryName, iconName = "settings", contextId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!contextId) {
                const context = yield this.createOrGetContext();
                contextId = context.getId().get();
            }
            return spinal_env_viewer_plugin_group_manager_service_1.groupManagerService.addCategory(contextId, categoryName.trim(), iconName.trim());
        });
    }
    /**
     * This method returns a category of context (if category name or id is passed) or all categories of context
     * @param contextId - contextId
     * @param categoryName  - category name or id (not required)
     * @returns
     */
    getCategories(contextId, categoryName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield spinal_env_viewer_plugin_group_manager_service_1.groupManagerService.getCategories(contextId);
            if (categoryName && categoryName.trim().length > 0) {
                const category = categories.filter(el => el.name.get() === categoryName || el.id.get() === categoryName);
                return spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode((_a = category === null || category === void 0 ? void 0 : category.id) === null || _a === void 0 ? void 0 : _a.get());
            }
            return categories.map(el => { var _a; return spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode((_a = el === null || el === void 0 ? void 0 : el.id) === null || _a === void 0 ? void 0 : _a.get()); });
        });
    }
    /**
     * This method updates a category, it takes as parameter two strings (categoryId and category new Values)
     * @param categoryId - string - the category Id
     * @param newValues - {name?: string; icon?: string } - object of new values (name and icon)
     * @returns
     */
    updateCategory(categoryId, newValues) {
        const node = spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode(categoryId);
        const { name, icon } = newValues;
        if (node && (name || icon)) {
            if (typeof name === "string" && name.trim().length > 0)
                node.info.name.set(name.trim());
            if (typeof icon === "string" && icon.trim().length > 0) {
                if (node.info.icon)
                    node.info.icon.set(icon.trim());
                else
                    node.info.add_attr({ icon });
            }
            return node;
        }
    }
    /**
     * It takes as parameters a contextId, categoryId, groupName et groupColor in hexadecimal (not required) and returns a spinalNode of group
     * @param contextId - contextId
     * @param categoryId - categoryId
     * @param groupName - group name
     * @param groupColor - group color (not required)
     * @returns
     */
    createGroup(contextId, categoryId, groupName, groupColor = "#fff000") {
        if (typeof groupName !== "string" || groupName.trim().length === 0)
            throw new Error("group name must be a string less than 1 character");
        if (!groupColor || groupColor.trim().length === 0)
            groupColor = "#fff000";
        return spinal_env_viewer_plugin_group_manager_service_1.groupManagerService.addGroup(contextId, categoryId, groupName, groupColor);
    }
    /**
     * This method updates a group, it takes as parameter two strings (groupId and new values)
     * @param groupId - string - the group Id
     * @param newValues - {name?: string; color?: string } - object of new values (name and color)
     * @returns
     */
    updateGroup(groupId, newValues) {
        const node = spinal_env_viewer_graph_service_1.SpinalGraphService.getRealNode(groupId);
        const { name, color } = newValues;
        if (node && (name || color)) {
            if (typeof name === "string" && name.trim().length > 0)
                node.info.name.set(name.trim());
            if (typeof color === "string" && color.trim().length > 0) {
                if (node.info.color)
                    node.info.color.set(color.trim());
                else
                    node.info.add_attr({ color });
            }
            return node;
        }
    }
}
exports.NomenclatureTree = NomenclatureTree;
//# sourceMappingURL=NomenclatureTree.js.map