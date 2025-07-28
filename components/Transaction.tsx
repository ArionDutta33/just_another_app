import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { JSX } from 'react';
import { View, Text } from 'react-native';
import { Expense } from '~/app';

type TransactionProps = Expense & { icon: JSX.Element };

const Transaction: React.FC<TransactionProps> = ({
  title,
  category,
  amout,
  createdAt,
  type,
  icon,
}) => {
  return (
    <View className="flex-row items-center rounded-2xl bg-white p-4 shadow-xl">
      <View className="rounded-full bg-[#f5f4f4] p-3">{icon}</View>

      <View className="mx-4">
        <Text className="text-lg font-bold">{title}</Text>
        <Text className="text-sm text-[#747474]">{category}</Text>
      </View>

      <View className="ml-auto border-r border-[#b6b6b6] px-4">
        <Text
          className={`${type === 'expense' ? 'text-red-500' : 'text-green-500'} text-lg font-bold`}>
          {type === 'expense' ? '-' : '+'}${Number(amout).toFixed(2)}
        </Text>
        <Text className="ml-auto text-xs text-[#cccccc]">
          {new Date(createdAt).toLocaleString()}
        </Text>
      </View>

      <MaterialCommunityIcons name="trash-can" size={20} color={'red'} className="px-4" />
    </View>
  );
};

export default Transaction;
