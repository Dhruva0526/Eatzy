import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from '../../../../styles/restaurant/settingsStyles';

const MenuModal = ({

  showMenuModal,
  setShowMenuModal,

  isEditMode,
  setIsEditMode,

  isAddMode,
  setIsAddMode,

  editingItem,
  setEditingItem,

  saveUpdatedItem,

  newItem,
  setNewItem,

  handleAddItem,

  menuItems,

  GREEN,
  ORANGE,

  openEditForm,
  handleToggleStatus,
  handleDeleteItem,

}) => {

  if (!showMenuModal) return null;

  return (
    <View style={styles.modalOverlay}>

      <View
        style={[
          styles.modalCard,
          {
            width: '95%',
            maxHeight: '85%',
          },
        ]}
      >

        {/* HEADER */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15,
          }}
        >

          <Text style={styles.modalTitle}>

            {isEditMode
              ? 'Update Item'
              : isAddMode
              ? 'Add New Item'
              : 'Menu Management'}

          </Text>

          <TouchableOpacity
            onPress={() => {

              setShowMenuModal(false);

              setIsAddMode(false);

              setIsEditMode(false);

            }}
          >
            <Ionicons
              name="close-circle"
              size={30}
              color="#777"
            />
          </TouchableOpacity>

        </View>

        {/* EDIT MODE */}
        {isEditMode ? (

          <View style={{ paddingVertical: 10 }}>

            <Text style={styles.modalLabel}>
              Item Name
            </Text>

            <TextInput
              style={[
                styles.timeInput,
                {
                  width: '100%',
                  marginBottom: 12,
                },
              ]}
              value={editingItem.name}
              onChangeText={(v) =>
                setEditingItem({
                  ...editingItem,
                  name: v,
                })
              }
            />

            <Text style={styles.modalLabel}>
              Description
            </Text>

            <TextInput
              style={[
                styles.timeInput,
                {
                  width: '100%',
                  marginBottom: 12,
                  height: 60,
                },
              ]}
              multiline={true}
              value={editingItem.desc}
              onChangeText={(v) =>
                setEditingItem({
                  ...editingItem,
                  desc: v,
                })
              }
            />

            <Text style={styles.modalLabel}>
              Price (₹)
            </Text>

            <TextInput
              style={[
                styles.timeInput,
                {
                  width: '100%',
                  marginBottom: 15,
                },
              ]}
              keyboardType="numeric"
              value={editingItem.price}
              onChangeText={(v) =>
                setEditingItem({
                  ...editingItem,
                  price: v,
                })
              }
            />

            <TouchableOpacity
              style={[
                styles.saveBtn,
                {
                  backgroundColor: ORANGE,
                },
              ]}
              onPress={saveUpdatedItem}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                Update Item
              </Text>
            </TouchableOpacity>

          </View>

        ) : isAddMode ? (

          /* ADD MODE */
          <View style={{ paddingVertical: 10 }}>

            <Text style={styles.modalLabel}>
              Item Name
            </Text>

            <TextInput
              style={[
                styles.timeInput,
                {
                  width: '100%',
                  marginBottom: 12,
                },
              ]}
              placeholder="e.g. Farmhouse Pizza"
              onChangeText={(v) =>
                setNewItem({
                  ...newItem,
                  name: v,
                })
              }
            />

            <Text style={styles.modalLabel}>
              Description
            </Text>

            <TextInput
              style={[
                styles.timeInput,
                {
                  width: '100%',
                  marginBottom: 12,
                  height: 60,
                },
              ]}
              placeholder="Short description..."
              multiline={true}
              onChangeText={(v) =>
                setNewItem({
                  ...newItem,
                  desc: v,
                })
              }
            />

            <Text style={styles.modalLabel}>
              Price (₹)
            </Text>

            <TextInput
              style={[
                styles.timeInput,
                {
                  width: '100%',
                  marginBottom: 15,
                },
              ]}
              placeholder="299"
              keyboardType="numeric"
              onChangeText={(v) =>
                setNewItem({
                  ...newItem,
                  price: v,
                })
              }
            />

            <TouchableOpacity
              style={[
                styles.saveBtn,
                {
                  backgroundColor: ORANGE,
                },
              ]}
              onPress={handleAddItem}
            >
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                Save Item
              </Text>
            </TouchableOpacity>

          </View>

        ) : (

          <>
            {/* ADD BUTTON */}
            <TouchableOpacity
              style={[
                styles.addBtnInside,
                {
                  backgroundColor: ORANGE,
                },
              ]}
              onPress={() =>
                setIsAddMode(true)
              }
            >

              <Ionicons
                name="add-circle"
                size={20}
                color="#fff"
                style={{ marginRight: 8 }}
              />

              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              >
                Add New Item
              </Text>

            </TouchableOpacity>

            {/* MENU LIST */}
            <ScrollView
              showsVerticalScrollIndicator={false}
            >

              {!Array.isArray(menuItems) ||
              menuItems.length === 0 ? (

                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 20,
                  }}
                >
                  No menu items found
                </Text>

              ) : (

                menuItems.map((item) => (

                  <View
                    key={item.id}
                    style={
                      styles.menuListItemExtended
                    }
                  >

                    {/* TOP */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >

                      <View style={{ flex: 1 }}>

                        <Text
                          style={
                            styles.itemNameText
                          }
                        >
                          {item.name}
                        </Text>

                        <Text
                          style={
                            styles.itemDescText
                          }
                          numberOfLines={2}
                        >
                          {item.desc}
                        </Text>

                        <Text
                          style={{
                            color: GREEN,
                            fontWeight: '700',
                            marginTop: 4,
                          }}
                        >
                          ₹{item.price}
                        </Text>

                      </View>

                      {/* STATUS */}
                      <View
                        style={{
                          alignItems: 'center',
                        }}
                      >

                        <View
                          style={[
                            styles.statusBadgeNew,
                            {
                              backgroundColor: item.is_available
                                ? '#E8FFF1'
                                : '#FFF1F1',

                              borderColor: item.is_available
                                ? '#34C759'
                                : '#FF6B6B',
                            },
                          ]}
                        >

                          <View
                            style={[
                              styles.statusDot,
                              {
                                backgroundColor:
                                  item.is_available
                                    ? '#34C759'
                                    : '#FF6B6B',
                              },
                            ]}
                          />

                          <Text
                            style={[
                              styles.statusTextNew,
                              {
                                color: item.is_available
                                  ? '#34C759'
                                  : '#FF6B6B',
                              },
                            ]}
                          >
                            {item.is_available
                              ? 'ACTIVE'
                              : 'INACTIVE'}
                          </Text>

                        </View>


                      </View>

                    </View>

                    {/* ACTIONS */}
                    <View style={styles.actionRow}>

                      <TouchableOpacity
                        onPress={() =>
                          openEditForm(item)
                        }
                        style={
                          styles.actionIconButton
                        }
                      >

                        <Ionicons
                          name="create-outline"
                          size={16}
                          color="#555"
                        />

                        <Text
                          style={
                            styles.actionIconText
                          }
                        >
                          Edit
                        </Text>

                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        onPress={() =>
                            handleToggleStatus(item.id)
                        }
                        style={[
                            styles.actionIconButton,
                            {
                            backgroundColor: item.is_available
                                ? '#FFF3EB'
                                : '#FFF1F1',
                            },
                        ]}
                        >

                        <Ionicons
                            name={
                            item.is_available
                                ? "pause-circle-outline"
                                : "play-circle-outline"
                            }
                            size={16}
                            color={
                            item.is_available
                                ? ORANGE
                                : '#FF6B6B'
                            }
                        />

                        <Text
                            style={[
                            styles.actionIconText,
                            {
                                color: item.is_available
                                ? ORANGE
                                : '#FF6B6B',
                            },
                            ]}
                        >
                            Status
                        </Text>

                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() =>
                          handleDeleteItem(
                            item.id
                          )
                        }
                        style={
                          styles.actionIconButton
                        }
                      >

                        <Ionicons
                          name="trash-outline"
                          size={16}
                          color="#E53E3E"
                        />

                        <Text
                          style={[
                            styles.actionIconText,
                            {
                              color: '#E53E3E',
                            },
                          ]}
                        >
                          Delete
                        </Text>

                      </TouchableOpacity>

                    </View>

                  </View>
                ))
              )}

            </ScrollView>
          </>
        )}

      </View>

    </View>
  );
};

export default MenuModal;