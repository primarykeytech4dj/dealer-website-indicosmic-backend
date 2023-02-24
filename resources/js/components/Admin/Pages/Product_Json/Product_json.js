const dataOfproduct={
    "basic_settings":{
        "version": 2.0,
        "has_multiple_sku": true,
        "has_multiple_categories":true,
    },
    "category_setting": {
        "has_multiple_product": true,
        "fields": {
            "id": {
                "required": true,
                "display": false,
                "type": "numeric",
                "default": false,
                "placeholder": false 
            },
            "parent_id": {
                "required": true,
                "display": true,
                "type": "dropdown",
                "options": {
                    "static": false,
                    "list": {
                        "cat 1": "Cat 1",
                        "cat 2": "Cat 2"
                    },
                    "data-url": "products/categoryList"
                },
                "default": {
                    "value": "0",
                    "text": "Select Category"
                }
            },
            "category_name": {
                "required": true,
                "display": false,
                "type": "text",
                "default": null,
                "placeholder": false,
                "maxlength": 160
            },
            "is_service": {
                "required": false,
                "display": true,
                "type": "toggle",
                "default": false,
                "placeholder": false
            },
            "description": {
                "required": false,
                "display": true,
                "type": "longtext",
                "default": null,
                "placeholder": false
            },
            "slug": {
                "required": true,
                "display": false,
                "type": "longtext",
                "default": null,
                "placeholder": false
            },
            "gst": {
                "required": false,
                "display": true,
                "type": "Float",
                "default": "0.00",
                "placeholder": false
            },
            "hsn_code": {
                "required": false,
                "display": true,
                "type": "longtext",
                "default": null,
                "placeholder": false,
                "maxlength": 8
            },
            "image_name_1": {
                "required": false,
                "display": true,
                "type": "file",
                "default": null,
                "allowed_format": [
                    "jpg",
                    "png",
                    "bmp"
                ],
                "dimension": "300w X 300h",
                "placeholder": "Upload Featured Image",
                "size": "100KB"
            },
            "image_name_2": {
                "required": false,
                "display": false,
                "type": "file",
                "default": null,
                "allowed_format": [
                    "jpg",
                    "png",
                    "bmp"
                ],
                "dimension": "1800w X 500h",
                "placeholder": "Upload Banner Image ",
                "size": "300KB"
            },
            "full_banner": {
                "required": false,
                "display": false,
                "type": "toggle",
                "default": false,
                "placeholder": "Android/IOS banner setting"
            },
            "is_active": {
                "required": true,
                "display": true,
                "type": "toggle",
                "default": true,
                "placeholder": false
            },
            "created": {
                "required": true,
                "display": false,
                "type": "datetime",
                "default": null,
                "placeholder": false
            },
            "modified": {
                "required": true,
                "display": false,
                "type": "datetime",
                "default": null,
                "placeholder": false
            },
            "created_by": {
                "required": true,
                "display": false,
                "type": "numeric",
                "default": 0,
                "placeholder": false
            },
            "modified_by": {
                "required": true,
                "display": false,
                "type": "numeric",
                "default": 0,
                "placeholder": false
            },
            "meta_keyword": {
                "required": true,
                "display": true,
                "type": "text",
                "default": null,
                "placeholder": "Meta Keyword",
                "maxlength": 160
            },
            "meta_title": {
                "required": true,
                "display": true,
                "type": "text",
                "default": null,
                "placeholder": "Meta Title",
                "maxlength": 160
            },
            "meta_description": {
                "required": true,
                "display": true,
                "type": "text",
                "default": null,
                "placeholder": "Meta Description",
                "maxlength": 160
            }
        }
    },
    "product_setting": {
        "has_multiple_category": true,
        "fields": {
            "id": {
                "required": true,
                "display": false,
                "type": "numeric",
                "default": false,
                "placeholder": false
            },
            "product_category_id": {
                "required": true,
                "display": true,
                "type": "dropdown",
                "options": {
                    "static": false,
                    "list": {
                        "cat 1": "Cat 1",
                        "cat 2": "Cat 2"
                    },
                    "data-url": "products/categoryList",
                    "url-params": []
                },
                "default": {
                    "value": "0",
                    "text": "Select Category"
                }
            },
            "product_type": {
                "required": true,
                "display": true,
                "type": "dropdown",
                "options": {
                    "static": true,
                    "list": {
                        "1": "Product",
                        "2": "Service",
                        "3": "Both"
                    }
                },
                "default": {
                    "value": "0",
                    "text": "Select Category"
                }
            },
            "product": {
                "required": true,
                "display": true,
                "type": "text",
                "default": null,
                "placeholder": "Product Name",
                "maxlength": 160
            },
            "tally_name": {
                "required": true,
                "display": false,
                "type": "text",
                "default": null,
                "placeholder": "Product Name"
            },
            "product_code": {
                "required": true,
                "display": false,
                "type": "text",
                "default": null,
                "placeholder": "Product Code"
            },
            "slug": {
                "required": true,
                "display": false,
                "type": "text",
                "default": null
            },
            "base_price": {
                "required": false,
                "display": true,
                "type": "Float",
                "default": "0.00",
                "placeholder": false
            },
            "base_uom": {
                "required": false,
                "display": true,
                "type": "text",
                "default": null,
                "placeholder": false
            },
            "description": {
                "required": false,
                "display": true,
                "type": "longtext",
                "default": null,
                "placeholder": false
            },
            "is_pack": {
                "required": true,
                "display": true,
                "type": "toggle",
                "default": true,
                "placeholder": false
            },
            "show_on_website": {
                "required": true,
                "display": true,
                "type": "toggle",
                "default": true,
                "placeholder": false
            },
            "is_sale": {
                "required": true,
                "display": true,
                "type": "toggle",
                "default": true,
                "placeholder": false
            },
            "is_new": {
                "required": true,
                "display": true,
                "type": "toggle",
                "default": true,
                "placeholder": false
            },
            "is_gift": {
                "required": true,
                "display": true,
                "type": "toggle",
                "default": true,
                "placeholder": false
            },
            "overall_stock_mgmt": {
                "required": true,
                "display": true,
                "type": "toggle",
                "default": true,
                "placeholder": false
            },
            "priority": {
                "required": false,
                "display": true,
                "type": "numeric",
                "default": "1",
                "placeholder": "Display Priority"
            },
            "created_by": {
                "required": true,
                "display": false,
                "type": "numeric",
                "default": 0,
                "placeholder": false
            },
            "is_active": {
                "required": true,
                "display": true,
                "type": "toggle",
                "default": true,
                "placeholder": false
            },
            "created": {
                "required": true,
                "display": false,
                "type": "datetime",
                "default": null,
                "placeholder": false
            },
            "modified": {
                "required": true,
                "display": false,
                "type": "datetime",
                "default": null,
                "placeholder": false
            },
            "modified_by": {
                "required": true,
                "display": false,
                "type": "numeric",
                "default": 0,
                "placeholder": false
            },
            "meta_keyword": {
                "required": true,
                "display": true,
                "type": "text",
                "default": null,
                "placeholder": "Meta Keyword",
                "maxlength": 160
            },
            "meta_title": {
                "required": true,
                "display": true,
                "type": "text",
                "default": null,
                "placeholder": "Meta Title",
                "maxlength": 160
            },
            "meta_description": {
                "required": true,
                "display": true,
                "type": "text",
                "default": null,
                "placeholder": "Meta Description",
                "maxlength": 160
            }
        }
    }
}

export  default dataOfproduct ;