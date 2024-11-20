
export interface ResourceConfig {
    name: string;
    list?: string;
    create?: string;
    edit?: string;
    view?: string;
  }
  
export const resources = [
    {
        name: "order",
        list: "/order",
        create: "/order/create",
        edit: "/order/edit/:id",
        view: "/order/:id",
    },
    {
        name: "user",
        list: "/user",
        create: "/user/create",
        edit: "/user/edit/:id",
        view: "/user/:id",
    },
    {
        name: "product",
        list: "/product",
        create: "/product/create",
        edit: "/product/edit/:id",
        view: "/product/:id",
    },
    {
        name: "dashboard",
        list: "/dashboard",
    },
    {
        name: "settings",
        list: "/settings",
    }
];

export const getResourceByName = (name: string) => {
    return resources.find(resource => resource.name === name);
};