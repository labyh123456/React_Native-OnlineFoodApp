import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import "react-native-url-polyfill/auto";
import {
  UserIcon,
  ChevronDownIcon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import React, { useEffect, useState } from "react";
import Categories from "./components/Categories";
import FeaturedRow from "./components/FeaturedRow";
import SanityClient from "../../sanity";
const HomeScreen = () => {
  const [flag, setFlag] = useState(false);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    SanityClient.fetch(
      `*[_type == "featured"] {..., restaurants[]->{..., dishes[]->}}`
    )
      .then((data) => {
        setFeaturedCategories(data);
      })
      .catch((err) => {
        console.log("Err at Home Page:", err);
      });
  }, []);

  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
      className="bg-white pt-5"
    >
      {/* Header */}
      <View className="flex-row items-center pb-3 mx-4 space-x-2">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-700">Deleivery Now</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>
        <UserIcon size={35} color={"#00CCBB"} />
      </View>

      {/* search */}
      <View className="flex-row items-center space-x-2 mx-4 pb-2">
        <View className="flex-row flex-1 items-center p-3 space-x-2 bg-gray-200">
          <MagnifyingGlassIcon color="#00CCBB" />
          <TextInput
            onFocus={() => setFlag(true)}
            className={`w-[90%]`}
            placeholder="Restaurant and Cuisions"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/* body */}
      <ScrollView
        className="bg-gray-200"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
        {/* Featured */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
