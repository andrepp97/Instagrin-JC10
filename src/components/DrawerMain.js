import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Icon} from 'react-native-elements';
import Settings from './Settings';
import TabMainMenu from './TabMainMenu';

const DrawerNavigator = createAppContainer(
  createDrawerNavigator(
    {
      MainMenu: {
        screen: TabMainMenu,
        navigationOptions: {
          drawerLabel: () => null,
        },
      },
      Settings: {
        screen: Settings,
        navigationOptions: {
          drawerLabel: 'Settings',
          drawerIcon: ({tintColor}) => (
            <Icon
              name={'cog'}
              type="font-awesome"
              size={25}
              color={tintColor}
            />
          ),
        },
      },
    },
    {
      drawerBackgroundColor: '#fff',
      drawerPosition: 'right',
      drawerType: 'slide',
      overlayColor: 1,
      style: {
        borderColor: '#cfcfcf',
        borderWidth: 1,
      },
      contentOptions: {
        activeTintColor: 'black',
      },
    },
  ),
);

export default DrawerNavigator;
