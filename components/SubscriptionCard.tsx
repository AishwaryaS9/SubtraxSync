import { formatCurrency, formatStatusLabel, formatSubscriptionDateTime } from '@/lib/utils'
import clsx from 'clsx'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

const SubscriptionCard = ({ name, price, currency, icon, billing, color, category, plan, renewalDate, expanded, onPress, paymentMethod, startDate, status }: SubscriptionCardProps) => {
    return (
        <Pressable onPress={onPress} className={clsx('sub-card', expanded ? 'sub-card-expanded' : 'bg-card')}
            style={!expanded && color ? { backgroundColor: color } : undefined}>
            <View className='sub-head'>
                <View className='sub-main'>
                    <Image source={icon} className='sub-icon' />
                    <View className='sub-copy'>
                        <Text numberOfLines={1} className='sub-title'>{name}</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' className='sub-meta'>
                            {category?.trim() || plan?.trim() || (renewalDate ? formatSubscriptionDateTime(renewalDate) : '')}
                        </Text>
                    </View>
                </View>
                <View className='sub-price-box'>
                    <Text className='sub-price'>{formatCurrency(price, currency)}</Text>
                    <Text className='sub-billing'>{billing}</Text>
                </View>
            </View>

            {expanded && (
                <View className='sub-body'>
                    <View className='sub-row sub-detail-row'>
                        <View className='sub-row-copy'>
                            <Text className='sub-label'>Payment info:</Text>
                            <Text className='sub-value' numberOfLines={1} ellipsizeMode='tail'>
                                {paymentMethod?.trim() ?? 'Not provided'}
                            </Text>
                        </View>
                    </View>

                    <View className='sub-actions'>
                        <Pressable className='sub-action-button' onPress={() => { }}>
                            <Text className='sub-action-button-text'>Manage</Text>
                        </Pressable>
                        <Pressable className='sub-action-button sub-action-secondary' onPress={() => { }}>
                            <Text className='sub-action-button-text'>Change</Text>
                        </Pressable>
                    </View>

                    <View className='sub-row sub-detail-row'>
                        <View className='sub-row-copy'>
                            <Text className='sub-label'>Plan details:</Text>
                            <Text className='sub-value' numberOfLines={1} ellipsizeMode='tail'>
                                {(plan?.trim() || category?.trim()) ?? 'Not provided'}
                            </Text>
                        </View>
                    </View>

                    <View className='sub-row sub-detail-row'>
                        <View className='sub-row-copy'>
                            <Text className='sub-label'>Started:</Text>
                            <Text className='sub-value' numberOfLines={1} ellipsizeMode='tail'>
                                {startDate ? formatSubscriptionDateTime(startDate) : 'Not provided'}
                            </Text>
                        </View>
                        <View className='sub-row-copy'>
                            <Text className='sub-label'>Renewal Date:</Text>
                            <Text className='sub-value' numberOfLines={1} ellipsizeMode='tail'>
                                {renewalDate ? formatSubscriptionDateTime(renewalDate) : 'Not provided'}
                            </Text>
                        </View>
                    </View>

                    <View className='sub-row sub-detail-row'>
                        <View className='sub-row-copy'>
                            <Text className='sub-label'>Status:</Text>
                            <Text className='sub-value' numberOfLines={1} ellipsizeMode='tail'>
                                {status ? formatStatusLabel(status) : 'Not provided'}
                            </Text>
                        </View>
                    </View>

                    <Pressable className='sub-cancel' onPress={() => { }}>
                        <Text className='sub-cancel-text'>Cancel Subscription</Text>
                    </Pressable>
                </View>
            )}

        </Pressable >
    )
}

export default SubscriptionCard