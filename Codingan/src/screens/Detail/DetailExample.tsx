// ========================
// src/screens/DetailScreen.tsx
// ========================
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Animated,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BlurView } from '@react-native-community/blur';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HEADER_HEIGHT = 300;

type NavProp = NativeStackNavigationProp<any>;

const DetailScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [quantity, setQuantity] = useState<number>(1);

  const pricePerItem = 10000;
  const totalPrice = quantity * pricePerItem;

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : q));

  const handleViewAll = () => Alert.alert('✨ Reviews', 'Menampilkan semua ulasan pengguna...');

  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.screen}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ScrollView utama */}
      <Animated.ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        {/* Header Gambar */}
        <Animated.View
          style={[
            styles.headerWrap,
            { transform: [{ translateY: imageTranslate }] },
          ]}
        >
          <ImageBackground
            source={require('../../../assets/labuanbajo.jpg')}
            style={styles.headerImage}
            imageStyle={styles.headerImageStyle}
          >
            {/* Tombol navigasi atas */}
            <View style={styles.topControls}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.iconRound}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back-outline" size={20} color="#fff" />
              </TouchableOpacity>

              <View style={styles.tempBox}>
                <Icon name="sunny-outline" size={16} color="#fff" />
                <Text style={styles.tempText}>24°C</Text>
              </View>
            </View>

            {/* Teks judul di atas gambar */}
            <View style={styles.headerOverlay}>
              <View style={styles.ratingPill}>
                <Icon name="star" size={12} color="#FFD66B" />
                <Text style={styles.ratingText}>5.0</Text>
              </View>

              <Text style={styles.title}>Labuan Bajo</Text>
              <Text style={styles.subtitle}>
                From crystal-clear waters to breathtaking sunsets, Labuan Bajo is calling! Explore hidden islands, swim with manta rays, and create memories that last a lifetime.
              </Text>
            </View>
          </ImageBackground>
        </Animated.View>

        {/* Konten */}
        <View style={styles.container}>
          <View style={styles.countryRow}>
            <View style={styles.flagCircle}>
              <Image source={require('../../../assets/flag.png')} style={styles.flagImage} />
            </View>
            <Text style={styles.countryText}>Indonesia</Text>
          </View>

          <Text style={styles.sectionTitle}>Discover the Beauty of Labuan Bajo</Text>

          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image source={require('../../../assets/ranggis.jpg')} style={styles.avatar} />
              <Text style={styles.reviewer}>By Ranggiss</Text>
            </View>

            <Text style={styles.reviewBody}>
              Wow amazing yahh, best experience in my life very very worth it! I like it! Very good very well.
            </Text>
          </View>

          <TouchableOpacity style={styles.viewAll} activeOpacity={0.8} onPress={handleViewAll}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitleSmall}>Recommendation in Bajo</Text>

          <View style={styles.recommendCard}>
            <Image source={require('../../../assets/ship.png')} style={styles.recommendImage} />
            <View style={styles.recommendTextWrap}>
              <Text style={styles.recommendTitle}>Phinisi Luxury Private Trip</Text>
              <Text style={styles.recommendSub}>Complimentary pick-up service</Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>

      {/* FOOTER */}
      {Platform.OS === 'ios' ? (
        <BlurView style={styles.footerContainer} blurType="light" blurAmount={20}>
          <BookingFooter
            quantity={quantity}
            increase={increaseQty}
            decrease={decreaseQty}
            totalPrice={totalPrice}
          />
        </BlurView>
      ) : (
        <View style={[styles.footerContainer, { backgroundColor: 'rgba(255,255,255,0.92)' }]}>
          <BookingFooter
            quantity={quantity}
            increase={increaseQty}
            decrease={decreaseQty}
            totalPrice={totalPrice}
          />
        </View>
      )}
    </View>
  );
};

/* ================== FOOTER COMPONENT ================== */
type BookingFooterProps = {
  quantity: number;
  increase: () => void;
  decrease: () => void;
  totalPrice: number;
};

const BookingFooter: React.FC<BookingFooterProps> = ({
  quantity,
  increase,
  decrease,
  totalPrice,
}) => {
  return (
    <View style={styles.footerInner}>
      {/* Bagian atas: quantity + total */}
      <View style={styles.footerTop}>
        <View style={styles.qtyBox}>
          <TouchableOpacity style={styles.qtyBtn} onPress={increase}>
            <Text style={styles.qtySign}>+</Text>
          </TouchableOpacity>

          <Text style={styles.qtyValue}>{quantity}</Text>

          <TouchableOpacity style={styles.qtyBtn} onPress={decrease}>
            <Text style={styles.qtySign}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalPrice}>${totalPrice.toLocaleString('en-US')}</Text>
        </View>
      </View>

      {/* Tombol Book Now */}
      <TouchableOpacity style={styles.bookBtn} activeOpacity={0.9}>
        <Text style={styles.bookBtnText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

/* ================== STYLES ================== */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F6F2EA' },

  scroll: { flex: 1 },
  headerWrap: { width: SCREEN_WIDTH, height: HEADER_HEIGHT},
  headerImage: { flex: 1, justifyContent: 'flex-end' },
  headerImageStyle: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },

  topControls: {
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 50,
    left: 25,
    right: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconRound: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  tempText: { color: '#fff', marginLeft: 6, fontSize: 20, fontWeight: '500' },

  headerOverlay: { padding: 20 },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  ratingText: { color: '#fff', marginLeft: 6, fontWeight: '600' },
  title: { color: '#fff', fontSize: 32, fontWeight: '700', marginBottom: 8 },
  subtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 13, lineHeight: 18, maxWidth: '92%' },

  container: { paddingHorizontal: 18, paddingVertical: 20 },
  countryRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  flagCircle: { width: 14, height: 14, borderRadius: 11, overflow: 'hidden', marginRight: 8 },
  flagImage: { width: '100%', height: '100%' },
  countryText: { fontSize: 13, color: '#333' },

  sectionTitle: { marginTop: 8, fontSize: 20, fontWeight: '700', color: '#111' },
  reviewCard: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },

  reviewHeader: {
    flexDirection: 'row', // biar sejajar kiri-kanan
    alignItems: 'center', // biar vertikalnya sejajar
    marginBottom: 8, // kasih jarak ke teks review di bawah
  },

  avatar: {
    width: 20,
    height: 20,
    borderRadius: 22,
    marginRight: 10, // jarak ke nama
  },

  reviewer: {
    fontWeight: '700',
    color: '#222',
    fontSize: 14,
  },

  reviewBody: {
    color: '#555',
    fontSize: 13,
    lineHeight: 18,
  },

  viewAll: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#F2EDE4',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 18,
  },
  viewAllText: { color: '#333', fontWeight: '600' },
  sectionTitleSmall: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  recommendCard: {
    flexDirection: 'row',
    backgroundColor: '#121212',
    borderRadius: 16,
    padding: 10,
  },
  recommendImage: { width: 110, height: 78, borderRadius: 12, marginRight: 10 },
  recommendTextWrap: { justifyContent: 'center', flex: 1 },
  recommendTitle: { color: '#fff', fontWeight: '700', fontSize: 14 },
  recommendSub: { color: '#cfcfcf', marginTop: 4 },

  /* ===== FOOTER ===== */
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 18,
    paddingBottom: Platform.OS === 'ios' ? 30 : 18,
    paddingTop: 10,
  },
  footerInner: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 0,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 8,
  },
  footerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  qtyBox: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: '#FF7A00',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  qtySign: { color: '#fff', fontWeight: '700', fontSize: 18 },
  qtyValue: { fontWeight: '900', fontSize: 18, color: '#000', marginHorizontal:8,},
  totalBox: { alignItems: 'flex-end', marginRight:0 },
  totalLabel: { color: '#666', fontSize: 14 },
  totalPrice: { fontWeight: '700', fontSize: 24, marginTop: 2 },
  bookBtn: {
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
  },
  bookBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});

export default DetailScreen;
