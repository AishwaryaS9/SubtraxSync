import ListHeading from '@/components/ListHeading'
import { chartBars, historyItems } from '@/constants/data'
import { icons } from '@/constants/icons'
import { styled } from 'nativewind'
import React from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'

const SafeAreaView = styled(RNSafeAreaView)

const Insights = () => {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView contentContainerClassName="p-5 pb-28" showsVerticalScrollIndicator={false}>
                <View className="insights-header">
                    <Pressable className="insights-icon-btn">
                        <Image source={icons.back} className="insights-icon" />
                    </Pressable>

                    <Text className="insights-title">Monthly Insights</Text>

                    <Pressable className="insights-icon-btn">
                        <Image source={icons.menu} className="insights-icon" />
                    </Pressable>
                </View>

                <View className="insights-section">
                    <ListHeading title="Upcoming" />

                    {/* <View className="insights-chart-card">
                        <View className="insights-chart-grid-lines">
                            {[0, 1, 2, 3, 4].map((line) => (
                                <View
                                    key={line}
                                    className="insights-chart-grid-line"
                                    style={{ top: `${14 + line * 17}%` }}
                                />
                            ))}
                        </View>
                        <View className="insights-chart-grid">
                            {chartBars.map((bar) => (
                                <View key={bar.label} className="insights-chart-item">
                                    {bar.highlighted && (
                                        <View className="insights-chart-badge">
                                            <Text className="insights-chart-badge-text">$40</Text>
                                        </View>
                                    )}
                                    <View className="insights-chart-bar-wrapper">
                                        <View
                                            className={bar.highlighted ? 'insights-chart-bar insights-chart-bar-highlighted' : 'insights-chart-bar'}
                                            style={{ height: `${bar.value * 2.25}px` }}
                                        />
                                    </View>
                                    <Text className="insights-chart-label">{bar.label}</Text>
                                </View>
                            ))}
                        </View>
                    </View> */}


                    <View className="insights-chart-card">
                        <View className="flex-row">
                            {/* Y-Axis Labels */}
                            <View className="insights-chart-y-axis">
                                {['45', '35', '25', '15', '5', '0'].map((label) => (
                                    <Text key={label} className="insights-chart-y-label">{label}</Text>
                                ))}
                            </View>

                            {/* Chart Area */}
                            <View className="flex-1 ml-2">
                                <View className="insights-chart-grid-lines">
                                    {[0, 1, 2, 3, 4, 5].map((line) => (
                                        <View
                                            key={line}
                                            className="insights-chart-grid-line"
                                            style={{ top: `${line * 20}%` }}
                                        />
                                    ))}
                                </View>

                                <View className="insights-chart-grid">
                                    {chartBars.map((bar) => (
                                        <View key={bar.label} className="insights-chart-item">
                                            <View className="h-56 justify-end items-center w-full">
                                                {bar.highlighted && (
                                                    <View className="insights-chart-badge">
                                                        <Text className="insights-chart-badge-text">$40</Text>
                                                        <View className="insights-chart-badge-arrow" />
                                                    </View>
                                                )}
                                                <View
                                                    className={bar.highlighted ? 'insights-chart-bar insights-chart-bar-highlighted' : 'insights-chart-bar'}
                                                    style={{ height: `${(bar.value / 45) * 100}%` }}
                                                />
                                            </View>
                                            <Text className="insights-chart-label">{bar.label}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    </View>

                </View>

                <View className="insights-summary-card">
                    <View>
                        <Text className="insights-summary-label">Expenses</Text>
                        <Text className="insights-summary-subtitle">March 2026</Text>
                    </View>
                    <View className="items-end">
                        <Text className="insights-summary-value">-$424.63</Text>
                        <Text className="insights-summary-change">+12%</Text>
                    </View>
                </View>

                <View className="insights-section">
                    <ListHeading title="History" />
                    <View>
                        {historyItems.map((item) => (
                            <View
                                key={item.id}
                                className="insights-history-card"
                                style={{ backgroundColor: item.bgColor }}
                            >
                                <View className="history-card-main">
                                    <View className="history-icon-container">
                                        <Image source={item.icon} className="history-icon" />
                                    </View>
                                    <View className="history-copy">
                                        <Text className="history-name" numberOfLines={1}>{item.name}</Text>
                                        <Text className="history-detail">{item.detail}</Text>
                                    </View>
                                    <View className="history-price-block">
                                        <Text className="history-price">{item.price}</Text>
                                        <Text className="history-frequency">{item.frequency}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Insights