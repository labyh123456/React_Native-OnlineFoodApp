import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../../sanity";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import DishRow from "./components/DishRow";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  return (
    <ScrollView>
      <View className="relative">
        <Image
          source={{
            uri: urlFor(imgUrl).url(),
          }}
          className="w-full h-56 bg-gray-300 p-4"
        />
        <TouchableOpacity
          className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full border border-gray-300"
          onPress={navigation.goBack}
        >
          <ArrowLeftIcon className="" size={20} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className="text-3xl font-bold">{title}</Text>
          <View className="flex-row space-x-2 my-1">
            <View className="flex-row space-x-2 items-center">
              <StarIcon color="green" opacity={0.5} size={22} />
              <Text className="text-xs  text-gray-500">
                <Text className="text-green-500">{rating}</Text>. {genre}
              </Text>
            </View>
            <View className="flex-row space-x-2 items-center">
              <MapPinIcon color="gray" opacity={0.4} size={22} />
              <Text className="text-xs  text-gray-500">Nearby . {address}</Text>
            </View>
          </View>

          <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
        </View>
        <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
          <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
          <Text className="pl-2 flex-1  text-md font-bold">
            Have a Food Alergey ?
          </Text>
          <ChevronRightIcon color="#00CCBB" />
        </TouchableOpacity>
      </View>

      <View>
        <Text className="pt-6 px-4 mb-3 font-bold text-xl">Menu</Text>

        {/* DishesRow */}
        {dishes.map((dishe) => (
          <DishRow
            key={dishe._id}
            id={dishe._id}
            name={dishe.name}
            description={dishe.short_description}
            price={dishe.price}
            image={dishe.image}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default RestaurantScreen;
