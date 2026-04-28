import { styled } from 'nativewind';
import React, { useMemo, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import SubscriptionCard from '../../components/SubscriptionCard';
import { useSubscriptions } from '../../context/SubscriptionsContext';

const SafeAreaView = styled(RNSafeAreaView);

const Subscriptions = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { subscriptions } = useSubscriptions();

    const filteredSubscriptions = useMemo(() => {
        if (!searchQuery.trim()) {
            return subscriptions;
        }
        return subscriptions.filter(sub =>
            sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (sub.category && sub.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (sub.plan && sub.plan.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [searchQuery, subscriptions]);

    const renderSubscription = ({ item }: { item: Subscription }) => (
        <View className='mb-4'>
            <SubscriptionCard
                {...item}
                expanded={false}
                onPress={() => {
                    // TODO: Navigate to subscription detail
                    console.log('Pressed', item.id);
                }}
            />
        </View>
    );

    return (
        <SafeAreaView className='flex-1 bg-background'>
            <View className='flex-1 p-5'>
                <Text className='text-2xl font-sans-bold text-primary mb-5'>Subscriptions</Text>

                <TextInput
                    className='auth-input mb-5'
                    placeholder="Search subscriptions..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                <FlatList
                    data={filteredSubscriptions}
                    keyExtractor={(item) => item.id}
                    renderItem={renderSubscription}
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode='on-drag'
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={
                        <View className='items-center justify-center py-10'>
                            <Text className='text-muted-foreground'>No subscriptions found</Text>
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
};

export default Subscriptions;