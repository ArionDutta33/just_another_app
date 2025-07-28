import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Vibration,
} from 'react-native';
import React, { useState } from 'react';
import { Redirect, router, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { supabase } from '~/utils/supabase';
import Toast from 'react-native-toast-message';
import { useAuth } from '~/components/provider/Auth';
export const categories = [
  { key: 'food', label: 'Food & Drinks', icon: <Ionicons name="fast-food" /> },
  { key: 'shopping', label: 'Shopping', icon: <Ionicons name="cart" /> },
  { key: 'transportation', label: 'Transportation', icon: <Ionicons name="car" /> },
  { key: 'entertainment', label: 'Entertainment', icon: <Ionicons name="film" /> },
  { key: 'bill', label: 'Bills', icon: <FontAwesome name="money" /> },
  { key: 'income', label: 'Income', icon: <FontAwesome name="money" /> },
  { key: 'other', label: 'Other', icon: <MaterialCommunityIcons name="dots-horizontal" /> },
];

const CreateTransaction = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigation = useRouter();
  const handleSelectCategory = (key: string) => {
    Vibration.vibrate(100);
    setSelectedCategory(key);
  };
  const addExpense = async () => {
    setLoading(true);

    if (!user?.id) {
      Toast.show({
        text1: 'Error',
        text2: 'User not authenticated',
        type: 'error',
      });
      return;
    }
    try {
      const { error } = await supabase
        .from('Expense')
        .insert([
          {
            title: title,
            amout: parseFloat(amount),
            category: selectedCategory,
            type: type,
            user_id: user?.id,
          },
        ])
        .select();

      if (error) {
        Toast.show({
          text1: 'Error',
          text2: error.message,
          type: 'error',
        });
        console.log(error);

        return;
      }
      setAmount('');
      setTitle('');
      setSelectedCategory('');
      setType('expense');
      Toast.show({
        text1: 'Success',
        text2: 'Expense added',
        type: 'success',
      });
      navigation.push('/');
    } catch (err: any) {
      Toast.show({
        text1: 'Unexpected Error',
        text2: err.message || 'Something went wrong',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  if (!isAuthenticated) {
    return <Redirect href={'/(auth)/Login'} />;
  }
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <SafeAreaView className="flex-1 bg-[#faedcd]">
          <View className="mx-4 my-6 flex-row items-center justify-between">
            <Ionicons
              onPress={() => {
                Vibration.vibrate(100);
                router.back();
              }}
              name="arrow-back"
              size={24}
            />
            <Text className="text-lg font-medium">New Transaction</Text>
            <Pressable onPress={addExpense} className="flex-row items-center gap-2">
              {loading ? (
                <Text className="text-sm font-medium">Saving...</Text>
              ) : (
                <>
                  <Text className="text-sm font-medium">Save</Text>
                  <Ionicons name="checkmark" size={12} />
                </>
              )}
            </Pressable>
          </View>

          <View className="mx-4 rounded-xl bg-white p-4 shadow-xl">
            <View className="mb-4 flex-row justify-center gap-4">
              <Pressable
                onPress={() => setType('expense')}
                className={`${
                  type === 'expense' ? 'bg-[#7f4f24]' : 'border border-[#c28d09]'
                } flex-row items-center gap-2 rounded-full px-10
                py-4`}>
                <View className="rounded-full bg-red-500 p-1">
                  <Ionicons name="arrow-down" color={'white'} size={12} />
                </View>
                <Text className={`${type === 'expense' ? 'text-white' : ''} font-bold`}>
                  Expense
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setType('income')}
                className={`${
                  type === 'income' ? 'bg-[#7f4f24]' : 'border border-[#c28d09]'
                } flex-row items-center gap-2 rounded-full px-10
                py-4`}>
                <View className="rounded-full bg-green-500 p-1">
                  <Ionicons name="arrow-up" color="white" size={12} />
                </View>
                <Text className={`${type === 'income' ? 'text-white' : ''} font-bold`}>Income</Text>
              </Pressable>
            </View>

            <View className="my-4 flex-row items-center border-b border-[#e2e2e2] px-4">
              <Text className="text-4xl font-bold">₹</Text>
              <TextInput
                className="flex-1 text-4xl font-bold"
                placeholder="0.00"
                value={amount}
                onChangeText={(value) => setAmount(value)}
                keyboardType="decimal-pad"
                placeholderTextColor={'#d4a276'}
              />
            </View>

            <View className="my-4 flex-row items-center rounded-xl border border-[#c28d09] px-4 py-1">
              <MaterialCommunityIcons name="note-edit-outline" size={22} color={'#c28d09'} />
              <TextInput
                placeholderTextColor={'#c28d09'}
                className="flex-1 px-4"
                value={title}
                onChangeText={(value) => setTitle(value)}
                placeholder="Transaction Title"
              />
            </View>

            <View className="mb-4 flex-row items-center gap-2">
              <AntDesign name="paperclip" size={20} />
              <Text className="text-xl font-bold">Category</Text>
            </View>

            <View className="flex-row flex-wrap gap-3">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.key;
                return (
                  <Pressable
                    key={cat.key}
                    onPress={() => handleSelectCategory(cat.key)}
                    className={`${isSelected ? 'bg-[#7f4f24]' : 'border-[#a3a1a1]'} flex-row
                      items-center gap-2 rounded-full border px-6
                    py-1`}>
                    {React.cloneElement(cat.icon, {
                      color: isSelected ? 'white' : 'black',
                    })}
                    <Text className={isSelected ? 'text-white' : 'text-black'}>{cat.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CreateTransaction;
