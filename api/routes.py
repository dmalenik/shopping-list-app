client = {
    "main": "/",
    "register": "/register",
    "login": "/login",
    "home": "/home",
    "add_dish": "/dish/add",
    "dish": "/dish/<int:id>",
    "shopping_list": "/list",
    "logout": "/logout",
}


api = {
    "register": "/api/register",
    "login": "/api/login",
    "logout": "/api/logout",
    "home": "/api/home",
    "user_update": "/api/user/update",
    "add_dish": "/api/dish/add",
    "dish": "/api/dish/<id>",
    "update_dish": "/api/dish/update",
    "shopping_list": "/api/list",
    "add_item": "/api/item/add",
    "update_item": "/api/item/update",
}
