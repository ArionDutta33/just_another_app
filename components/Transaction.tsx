import { View, Text } from 'react-native';
import React from 'react';
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type TransactionProps = {
  id: number;
  category: string;
  isExpense: boolean;
  expense: string;
  date: string;
  expenseTitle: string;
};
const Transaction: React.FC<TransactionProps> = (item) => {
  return (
    <View className="flex-row items-center rounded-2xl bg-white p-4 shadow-xl">
      <View className=" rounded-full bg-[#f5f4f4] p-3">
        <MaterialCommunityIcons name="dots-horizontal" size={18} color={'red'} />
      </View>
      <View className="mx-4">
        <Text className="text-lg font-bold">{item.expenseTitle}</Text>
        <Text className="text-sm  text-[#747474]">{item.category}</Text>
      </View>
      <View className="ml-auto   border-r border-[#b6b6b6] px-4">
        <Text className={`${item.isExpense ? 'text-red-500' : 'text-green-500'} text-lg font-bold`}>
          {item.isExpense ? '-' : '+'} ${item.expense}
        </Text>
        <Text className="ml-auto text-xs text-[#cccccc]">{item.date}</Text>
      </View>
      <MaterialCommunityIcons name="trash-can" size={20} color={'red'} className="px-4" />
    </View>
  );
};

export default Transaction;
