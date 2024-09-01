import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import config from '../../config';

export type RootStackParamList = {
	PremiumFeed: undefined;
	PremiumDetails: { id: number }; // Premium ID
	Banners: undefined;
};
