(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/api.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "authApi": (()=>authApi),
    "cartApi": (()=>cartApi),
    "chatApi": (()=>chatApi),
    "fetchApi": (()=>fetchApi),
    "quizApi": (()=>quizApi),
    "recommendationsApi": (()=>recommendationsApi),
    "uploadApi": (()=>uploadApi)
});
const API_BASE_URL = "/api";
async function fetchApi(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "An error occurred");
        }
        return {
            success: true,
            data: data
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "An error occurred"
        };
    }
}
const authApi = {
    login: async (email, password)=>{
        return fetchApi("/auth", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        });
    }
};
const recommendationsApi = {
    getRecommendations: async (filters)=>{
        const queryString = filters ? `?${new URLSearchParams(filters).toString()}` : "";
        return fetchApi(`/recommendations${queryString}`);
    },
    getPersonalized: async (preferences)=>{
        return fetchApi("/recommendations", {
            method: "POST",
            body: JSON.stringify({
                userPreferences: preferences
            })
        });
    }
};
const chatApi = {
    sendMessage: async (message, context)=>{
        return fetchApi("/chat", {
            method: "POST",
            body: JSON.stringify({
                message,
                context
            })
        });
    },
    getHistory: async ()=>{
        return fetchApi("/chat");
    }
};
const cartApi = {
    getCart: async ()=>{
        return fetchApi("/cart");
    },
    updateCart: async (action, itemId, quantity)=>{
        return fetchApi("/cart", {
            method: "POST",
            body: JSON.stringify({
                action,
                itemId,
                quantity
            })
        });
    },
    optimizeCart: async (cart)=>{
        return fetchApi("/cart", {
            method: "PUT",
            body: JSON.stringify({
                cart
            })
        });
    }
};
const uploadApi = {
    uploadImage: async (file)=>{
        const formData = new FormData();
        formData.append("image", file);
        return fetchApi("/upload", {
            method: "POST",
            body: formData,
            headers: {}
        });
    }
};
const quizApi = {
    submitQuiz: async (answers)=>{
        return fetchApi("/quiz", {
            method: "POST",
            body: JSON.stringify({
                answers
            })
        });
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/context/AppContext.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AppProvider": (()=>AppProvider),
    "useApp": (()=>useApp)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const initialState = {
    user: null,
    cart: [],
    loading: false,
    error: null
};
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function appReducer(state, action) {
    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.payload
            };
        case "SET_CART":
            return {
                ...state,
                cart: action.payload
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            };
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [
                    ...state.cart,
                    action.payload
                ]
            };
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((item)=>item.id !== action.payload)
            };
        case "UPDATE_CART_ITEM":
            return {
                ...state,
                cart: state.cart.map((item)=>item.id === action.payload.id ? {
                        ...item,
                        quantity: action.payload.quantity
                    } : item)
            };
        default:
            return state;
    }
}
function AppProvider({ children }) {
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(appReducer, initialState);
    // Load initial cart data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            async function loadCart() {
                try {
                    dispatch({
                        type: "SET_LOADING",
                        payload: true
                    });
                    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cartApi"].getCart();
                    if (response.success && response.data) {
                        dispatch({
                            type: "SET_CART",
                            payload: response.data.cart
                        });
                    }
                } catch (error) {
                    dispatch({
                        type: "SET_ERROR",
                        payload: "Failed to load cart"
                    });
                } finally{
                    dispatch({
                        type: "SET_LOADING",
                        payload: false
                    });
                }
            }
            if (state.user) {
                loadCart();
            }
        }
    }["AppProvider.useEffect"], [
        state.user
    ]);
    const login = async (email, password)=>{
        try {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authApi"].login(email, password);
            if (response.success && response.data) {
                dispatch({
                    type: "SET_USER",
                    payload: response.data.user
                });
            } else {
                throw new Error(response.error || "Login failed");
            }
        } catch (error) {
            dispatch({
                type: "SET_ERROR",
                payload: error instanceof Error ? error.message : "Login failed"
            });
        } finally{
            dispatch({
                type: "SET_LOADING",
                payload: false
            });
        }
    };
    const logout = ()=>{
        dispatch({
            type: "SET_USER",
            payload: null
        });
        dispatch({
            type: "SET_CART",
            payload: []
        });
    };
    const addToCart = async (item)=>{
        try {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cartApi"].updateCart("add", item.id);
            if (response.success && response.data) {
                dispatch({
                    type: "ADD_TO_CART",
                    payload: item
                });
            } else {
                throw new Error(response.error || "Failed to add item to cart");
            }
        } catch (error) {
            dispatch({
                type: "SET_ERROR",
                payload: error instanceof Error ? error.message : "Failed to add item"
            });
        } finally{
            dispatch({
                type: "SET_LOADING",
                payload: false
            });
        }
    };
    const removeFromCart = async (itemId)=>{
        try {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cartApi"].updateCart("remove", itemId);
            if (response.success && response.data) {
                dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: itemId
                });
            } else {
                throw new Error(response.error || "Failed to remove item from cart");
            }
        } catch (error) {
            dispatch({
                type: "SET_ERROR",
                payload: error instanceof Error ? error.message : "Failed to remove item"
            });
        } finally{
            dispatch({
                type: "SET_LOADING",
                payload: false
            });
        }
    };
    const updateCartItem = async (itemId, quantity)=>{
        try {
            dispatch({
                type: "SET_LOADING",
                payload: true
            });
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cartApi"].updateCart("update", itemId, quantity);
            if (response.success && response.data) {
                dispatch({
                    type: "UPDATE_CART_ITEM",
                    payload: {
                        id: itemId,
                        quantity
                    }
                });
            } else {
                throw new Error(response.error || "Failed to update cart item");
            }
        } catch (error) {
            dispatch({
                type: "SET_ERROR",
                payload: error instanceof Error ? error.message : "Failed to update item"
            });
        } finally{
            dispatch({
                type: "SET_LOADING",
                payload: false
            });
        }
    };
    const contextValue = {
        state,
        dispatch,
        login,
        logout,
        addToCart,
        removeFromCart,
        updateCartItem
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/context/AppContext.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
_s(AppProvider, "bgCdjuTOmPdSBRwTap80EFd9Y3U=");
_c = AppProvider;
function useApp() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}
_s1(useApp, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AppProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_lib_9bbc1d2a._.js.map