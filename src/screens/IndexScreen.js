import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { Context as BlogContext } from "../context/BlogContext";

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(BlogContext);

  useEffect(() => {
    getBlogPosts();

    const listenner = navigation.addListener("focus", () => {
      getBlogPosts();
    });

    return () => {
      listenner.remove();
    };
  }, []);

  return (
    <View>
      {/* <Text>Index Screen</Text> */}
      {/* <Button title="Add Post" onPress={addBlogPost} /> */}
      <FlatList
        data={state}
        keyExtractor={(blogPosts) => blogPosts.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Detail", { id: item.id })}
            >
              <View style={styles.blogItem}>
                <Text style={styles.blogTitle}>
                  {item.id} - {item.title}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                  <Feather style={styles.deleteIcon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blogItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "grey",
  },
  blogTitle: {
    fontSize: 18,
  },
  deleteIcon: {
    fontSize: 24,
  },
  plusIcon: {
    fontSize: 24,
    marginRight: 15,
  },
});

export default IndexScreen;
