package com.zshop.core.log;

/**
 * 操作日志内容
 * @author zgx
 */
public class ActionLogItem {
    /**
     * 更新的表名称
     */
    private String updateTbName;
    /**
     * 是否新增
     */
    private Boolean isCreate = false;
    /**
     * 是否修改
     */
    private Boolean isUpdate = false;
    /**
     * 修改的字段名
     */
    private String itemName;
    /**
     * 修改字段的内容
     */
    private String itemValue;
    /**
     * 是否删除
     */
    private Boolean isDelete = false;
    /**
     * 操作记录的id
     */
    private String recordId;

    public ActionLogItem() {
    }

    public Boolean getCreate() {
        return isCreate;
    }

    public void setCreate(Boolean create) {
        isCreate = create;
    }

    public String getUpdateTbName() {
        return updateTbName;
    }

    public void setUpdateTbName(String updateTbName) {
        this.updateTbName = updateTbName;
    }

    public Boolean getUpdate() {
        return isUpdate;
    }

    public void setUpdate(Boolean update) {
        isUpdate = update;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemValue() {
        return itemValue;
    }

    public void setItemValue(String itemValue) {
        this.itemValue = itemValue;
    }

    public Boolean getDelete() {
        return isDelete;
    }

    public void setDelete(Boolean delete) {
        isDelete = delete;
    }

    public String getRecordId() {
        return recordId;
    }

    public void setRecordId(String recordId) {
        this.recordId = recordId;
    }
}
