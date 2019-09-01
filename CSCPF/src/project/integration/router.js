import Test1View from "../views/test1/index.vue";
import Child1View from "../views/test1/child1.vue";

const router = [
  {
    path: "Test1",
    name: "project_test1",
    component: Test1View,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "Child1",
        name: "project_test1_child1",
        component: Child1View,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
];

export default router;
