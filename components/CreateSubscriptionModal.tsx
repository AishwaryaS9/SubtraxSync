import { icons } from "@/constants/icons";
import clsx from "clsx";
import dayjs from "dayjs";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

const CATEGORIES = [
    "Entertainment",
    "AI Tools",
    "Developer Tools",
    "Design",
    "Productivity",
    "Cloud",
    "Music",
    "Other",
] as const;

const CATEGORY_COLORS: Record<string, string> = {
    Entertainment: "#ff6b6b",
    "AI Tools": "#b8d4e3",
    "Developer Tools": "#e8def8",
    Design: "#f5c542",
    Productivity: "#a8e6cf",
    Cloud: "#ffd3b6",
    Music: "#ffaaa5",
    Other: "#c7ceea",
};

export default function CreateSubscriptionModal({
    visible,
    onClose,
    onSubmit,
}: CreateSubscriptionModalProps) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [frequency, setFrequency] = useState<"Monthly" | "Yearly">("Monthly");
    const [category, setCategory] = useState<string>("Other");
    const [errors, setErrors] = useState<{ name?: string; price?: string }>({});

    const validateForm = () => {
        const newErrors: { name?: string; price?: string } = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        }

        const priceNum = parseFloat(price);
        if (!price || isNaN(priceNum) || priceNum <= 0) {
            newErrors.price = "Price must be a positive number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const startDate = dayjs().toISOString();
        const renewalDate = dayjs().add(1, frequency === "Monthly" ? "month" : "year").toISOString();


        const subscription: Subscription = {
            id: `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
            name: name.trim(),
            price: parseFloat(price),
            icon: icons.plus,
            category,
            billing: frequency,
            frequency: frequency as any,
            status: "active",
            startDate,
            renewalDate,
            color: CATEGORY_COLORS[category] || CATEGORY_COLORS["Other"],
            currency: "USD",
        };

        onSubmit(subscription);
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setName("");
        setPrice("");
        setFrequency("Monthly");
        setCategory("Other");
        setErrors({});
    };

    const isFormValid =
        name.trim().length > 0 &&
        price &&
        !isNaN(parseFloat(price)) &&
        parseFloat(price) > 0;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 justify-end">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className="modal-container"
                >
                    <View className="modal-header">
                        <Text className="modal-title">New Subscription</Text>
                        <Pressable className="modal-close" onPress={onClose}>
                            <Text className="modal-close-text">×</Text>
                        </Pressable>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className="modal-body">
                            {/* Name Field */}
                            <View className="auth-field">
                                <Text className="auth-label">Name</Text>
                                <TextInput
                                    className={clsx(
                                        "auth-input",
                                        errors.name && "auth-input-error"
                                    )}
                                    placeholder="e.g., Netflix"
                                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                                    value={name}
                                    onChangeText={setName}
                                />
                                {errors.name && (
                                    <Text className="auth-error">
                                        {errors.name}
                                    </Text>
                                )}
                            </View>

                            {/* Price Field */}
                            <View className="auth-field">
                                <Text className="auth-label">Price</Text>
                                <TextInput
                                    className={clsx(
                                        "auth-input",
                                        errors.price && "auth-input-error"
                                    )}
                                    placeholder="e.g., 9.99"
                                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                                    value={price}
                                    onChangeText={setPrice}
                                    keyboardType="decimal-pad"
                                />
                                {errors.price && (
                                    <Text className="auth-error">
                                        {errors.price}
                                    </Text>
                                )}
                            </View>

                            {/* Frequency Toggle */}
                            <View className="auth-field">
                                <Text className="auth-label">Frequency</Text>
                                <View className="picker-row">
                                    {(["Monthly", "Yearly"] as const).map(
                                        (freq) => (
                                            <Pressable
                                                key={freq}
                                                className={clsx(
                                                    "picker-option",
                                                    frequency === freq &&
                                                    "picker-option-active"
                                                )}
                                                onPress={() =>
                                                    setFrequency(freq)
                                                }
                                            >
                                                <Text
                                                    className={clsx(
                                                        "picker-option-text",
                                                        frequency === freq &&
                                                        "picker-option-text-active"
                                                    )}
                                                >
                                                    {freq}
                                                </Text>
                                            </Pressable>
                                        )
                                    )}
                                </View>
                            </View>

                            {/* Category Selection */}
                            <View className="auth-field">
                                <Text className="auth-label">Category</Text>
                                <View className="category-scroll">
                                    {CATEGORIES.map((cat) => (
                                        <Pressable
                                            key={cat}
                                            className={clsx(
                                                "category-chip",
                                                category === cat &&
                                                "category-chip-active"
                                            )}
                                            onPress={() => setCategory(cat)}
                                        >
                                            <Text
                                                className={clsx(
                                                    "category-chip-text",
                                                    category === cat &&
                                                    "category-chip-text-active"
                                                )}
                                            >
                                                {cat}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            {/* Submit Button */}
                            <Pressable
                                className={clsx(
                                    "auth-button",
                                    !isFormValid && "auth-button-disabled"
                                )}
                                onPress={handleSubmit}
                                disabled={!isFormValid}
                            >
                                <Text className="auth-button-text">
                                    Create Subscription
                                </Text>
                            </Pressable>

                            {/* Extra spacing for keyboard */}
                            <View className="h-6" />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}
