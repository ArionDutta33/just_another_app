import React, { JSX, useEffect, useState } from 'react';
import { Link, Redirect, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { FlatList, Image, Pressable, Text, Vibration, View } from 'react-native';
import logo from '../assets/images/logo.png';
import Transaction from '~/components/Transaction';
import { useAuth } from '~/components/provider/Auth';
import { supabase } from '~/utils/supabase';

export interface Expense {
  id: string;
  createdAt: string | Date;
  title: string;
  amout: string | number;
  category: string;
  type: 'expense' | 'income';
}
export const categoryMap: Record<string, { label: string; icon: JSX.Element }> = {
  food: {
    label: 'Food & Drinks',
    icon: <Ionicons name="fast-food" size={18} color="#333" />,
  },
  shopping: {
    label: 'Shopping',
    icon: <Ionicons name="cart" size={18} color="#333" />,
  },
  transportation: {
    label: 'Transportation',
    icon: <Ionicons name="car" size={18} color="#333" />,
  },
  entertainment: {
    label: 'Entertainment',
    icon: <Ionicons name="film" size={18} color="#333" />,
  },
  bill: {
    label: 'Bills',
    icon: <FontAwesome name="money" size={18} color="#333" />,
  },
  income: {
    label: 'Income',
    icon: <FontAwesome name="money" size={18} color="#333" />,
  },
  other: {
    label: 'Other',
    icon: <MaterialCommunityIcons name="dots-horizontal" size={18} color="#333" />,
  },
};

const Home = () => {
  const [expenseItem, setExpenseItem] = useState<Expense[]>([]);
  const [income, setIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const getExpenses = async () => {
      const { data, error } = await supabase.from('Expense').select('*');

      if (error) {
        console.error('Error fetching expenses:', error.message);
        return;
      }

      const expenses = data || [];
      setExpenseItem(expenses);

      const totalIncome = expenses
        .filter((item) => item.type === 'income')
        .reduce((sum, item) => sum + Number(item.amout), 0);

      const totalExpense = expenses
        .filter((item) => item.type === 'expense')
        .reduce((sum, item) => sum + Number(item.amout), 0);

      setIncome(totalIncome);
      setTotalExpenses(totalExpense);
    };

    getExpenses();
  }, []);

  if (!isAuthenticated) {
    return <Redirect href={'/(auth)/Login'} />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="flex-1 bg-[#faedcd]">
        <View className="my-5 flex-row items-center justify-between px-4">
          <Image style={{ height: 100, width: 100 }} resizeMode="center" source={logo} />
          <View>
            <Text className="font-medium text-[#838383]">Welcome,</Text>
            <Text className="text-lg font-bold text-[#7f4f24]">Test</Text>
          </View>
          <Link asChild href={'/Create/CreateTransaction'}>
            <Pressable
              onPress={() => Vibration.vibrate(100)}
              className="flex-row items-center gap-2 rounded-full bg-[#7f4f24] px-4 py-2">
              <Ionicons name="add" color={'white'} size={20} />
              <Text className="text-white">Add</Text>
            </Pressable>
          </Link>
          <View className="rounded-full bg-white p-2">
            <Ionicons
              onPress={async () => {
                Vibration.vibrate(100);
                await supabase.auth.signOut();
              }}
              name="log-out-outline"
              color={'black'}
              size={20}
            />
          </View>
        </View>

        <View className="mx-4 rounded-xl bg-white p-4 shadow-xl">
          <Text className="mb-2 text-gray-400">Total Balance</Text>
          <Text className="text-3xl font-bold text-[#6b3b11]">
            ${(income - totalExpenses).toFixed(2)}
          </Text>

          <View className="mt-6 flex-row items-center justify-between">
            <View>
              <Text className="text-center text-gray-400">Income</Text>
              <Text className="text-lg font-bold text-green-500">+${income.toFixed(2)}</Text>
            </View>
            <View className="border-l border-[#cac8c8] px-5">
              <Text className="text-center text-gray-400">Expenses</Text>
              <Text className="text-lg font-bold text-red-500">-${totalExpenses.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View className="mx-4">
          <Text className="my-6 text-xl font-bold">Recent Transactions</Text>
        </View>

        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={expenseItem}
          contentContainerClassName="gap-4 mx-4 pb-20"
          renderItem={({ item }) => (
            <Transaction
              category={item.category}
              amout={item.amout}
              createdAt={new Date(item.createdAt)}
              title={item.title}
              id={item.id.toString()}
              type={item.type}
              icon={categoryMap[item.category]?.icon || categoryMap['other'].icon}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;
