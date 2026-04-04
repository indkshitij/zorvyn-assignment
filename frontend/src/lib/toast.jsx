import toast from "react-hot-toast";

export const showToast = (message, type = "success", options = {}) => {
  const baseStyle = {
    borderRadius: "12px",
    padding: "16px 20px",
    fontWeight: "400",
    fontSize: "15px",
  };

  // types of toast
  const types = {
    // success toast
    success: () =>
      toast.success(message, {
        ...options,
        style: {
          ...baseStyle,
          border: "1px solid #16a34a", // green border
          background: "#ecfdf5", // light green bg
          color: "#166534", // dark green text
        },
        iconTheme: {
          primary: "#16a34a",
          secondary: "#ecfdf5",
        },
      }),

    // error toast
    error: () =>
      toast.error(message, {
        ...options,
        style: {
          ...baseStyle,
          border: "1px solid #dc2626", // red border
          background: "#fef2f2", // light red bg
          color: "#991b1b", // dark red text
        },
        iconTheme: {
          primary: "#dc2626",
          secondary: "#fef2f2",
        },
      }),

    // loading toast
    loading: () =>
      toast.loading(message, {
        ...options,
        style: {
          ...baseStyle,
          border: "1px solid #2563eb", // blue border
          background: "#eff6ff", // light blue bg
          color: "#1e3a8a", // dark blue text
        },
      }),

    // info toast
    info: () =>
      toast(message, {
        icon: "ℹ️",
        ...options,
        style: {
          ...baseStyle,
          border: "1px solid #6b7280", // gray border
          background: "#f9fafb",
          color: "#111827",
        },
      }),
  };

  // fallback if type not found
  return types[type]?.() || toast(message, options);
};

export const showPromiseToast = (promise, messages) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    },
    {
      style: {
        borderRadius: "12px",
        padding: "16px 20px",
        fontWeight: "400",
        fontSize: "15px",
      },
    },
  );
};
