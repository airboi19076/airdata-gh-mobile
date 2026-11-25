import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert
} from "react-native";

const BLUE = "#247BFF";
const BG = "#07111F";
const CARD = "#101F32";
const MUTED = "#8FA4BE";

export default function App() {
  const [tab, setTab] = useState("Home");

  const networks = [
    { name: "MTN", color: "#FFCB05", symbol: "M" },
    { name: "Telecel", color: "#E83B52", symbol: "T" },
    { name: "AirtelTigo", color: "#E84A91", symbol: "A" }
  ];

  const action = (name) =>
    Alert.alert("AirData GH", name + " will be available when we connect your account and backend.");

  function Header() {
    return (
      <View style={styles.header}>
        <View style={styles.brand}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>AD</Text>
          </View>
          <View>
            <Text style={styles.brandName}>AirData <Text style={{color: BLUE}}>GH</Text></Text>
            <Text style={styles.tagline}>YOUR CONNECTION. OUR PRIORITY.</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.bell} onPress={() => action("Notifications")}>
          <Text style={{fontSize: 20}}>♧</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function Home() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>Welcome back 👋</Text>
        <Text style={styles.heading}>Your data, your way.</Text>

        <View style={styles.wallet}>
          <Text style={styles.walletLabel}>WALLET BALANCE</Text>
          <Text style={styles.balance}>GH₵ 0.00</Text>
          <View style={styles.walletBottom}>
            <Text style={styles.walletHint}>Available balance</Text>
            <TouchableOpacity style={styles.topUp} onPress={() => action("Wallet top-up")}>
              <Text style={styles.topUpText}>＋ Top up</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick actions</Text>
        <View style={styles.actions}>
          {[
            ["＋", "Top up", "Deposit money"],
            ["⇧", "Buy data", "Get bundles"],
            ["▤", "My orders", "Track purchases"],
            ["◉", "Agent shop", "Grow your sales"]
          ].map(([icon, title, subtitle]) => (
            <TouchableOpacity
              key={title}
              style={styles.actionCard}
              onPress={() => action(title)}
            >
              <Text style={styles.actionIcon}>{icon}</Text>
              <Text style={styles.actionTitle}>{title}</Text>
              <Text style={styles.actionSubtitle}>{subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Choose your network</Text>
        {networks.map((network) => (
          <TouchableOpacity
            key={network.name}
            style={styles.network}
            onPress={() => action(network.name + " bundles")}
          >
            <View style={[styles.networkIcon, {backgroundColor: network.color}]}>
              <Text style={styles.networkSymbol}>{network.symbol}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.networkName}>{network.name}</Text>
              <Text style={styles.networkHint}>Explore available bundles</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Need assistance?</Text>
          <Text style={styles.noticeText}>Our support team is here to help you.</Text>
          <TouchableOpacity onPress={() => action("Customer support")}>
            <Text style={styles.noticeLink}>Contact support →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  function OtherPage() {
    const descriptions = {
      "Buy Data": "Choose a network and purchase your preferred data bundle.",
      "Orders": "Your data purchases and transaction history will appear here.",
      "Account": "Manage your AirData GH account and preferences."
    };

    return (
      <View style={styles.otherPage}>
        <Text style={styles.heading}>{tab}</Text>
        <Text style={styles.otherText}>{descriptions[tab]}</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => action(tab)}>
          <Text style={styles.primaryText}>
            {tab === "Buy Data" ? "Explore bundles" : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          {tab === "Home" ? <Home /> : <OtherPage />}
        </View>
        <View style={styles.nav}>
          {["Home", "Buy Data", "Orders", "Account"].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.navItem}
              onPress={() => setTab(item)}
            >
              <Text style={[styles.navIcon, tab === item && styles.active]}>
                {item === "Home" ? "⌂" :
                 item === "Buy Data" ? "⇧" :
                 item === "Orders" ? "▤" : "◉"}
              </Text>
              <Text style={[styles.navLabel, tab === item && styles.active]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },
  container: { flex: 1, backgroundColor: BG, paddingHorizontal: 20 },
  header: {
    height: 76, flexDirection: "row", alignItems: "center",
    justifyContent: "space-between"
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 11 },
  logo: {
    width: 43, height: 43, borderRadius: 14,
    backgroundColor: BLUE, alignItems: "center", justifyContent: "center"
  },
  logoText: { color: "white", fontSize: 17, fontWeight: "900" },
  brandName: { color: "white", fontSize: 19, fontWeight: "900" },
  tagline: { color: MUTED, fontSize: 7, letterSpacing: 1.1, marginTop: 3 },
  bell: {
    width: 42, height: 42, borderRadius: 14,
    backgroundColor: CARD, alignItems: "center", justifyContent: "center"
  },
  content: { flex: 1 },
  greeting: { color: MUTED, fontSize: 14, marginTop: 12 },
  heading: { color: "white", fontSize: 25, fontWeight: "900", marginTop: 5 },
  wallet: {
    backgroundColor: "#12366A", borderRadius: 22, padding: 22,
    marginTop: 22, marginBottom: 27
  },
  walletLabel: { color: "#B7D3FF", fontSize: 11, letterSpacing: 1.5 },
  balance: { color: "white", fontSize: 34, fontWeight: "900", marginTop: 12 },
  walletBottom: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginTop: 17
  },
  walletHint: { color: "#B7D3FF", fontSize: 12 },
  topUp: { backgroundColor: "white", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12 },
  topUpText: { color: "#12366A", fontWeight: "800" },
  sectionTitle: { color: "white", fontSize: 17, fontWeight: "800", marginBottom: 14 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 11, marginBottom: 27 },
  actionCard: {
    width: "48%", backgroundColor: CARD, borderRadius: 17,
    padding: 15, minHeight: 112
  },
  actionIcon: { color: "#62A1FF", fontSize: 23, marginBottom: 10 },
  actionTitle: { color: "white", fontSize: 14, fontWeight: "800" },
  actionSubtitle: { color: MUTED, fontSize: 11, marginTop: 4 },
  network: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: CARD, padding: 13, borderRadius: 16, marginBottom: 10
  },
  networkIcon: {
    width: 42, height: 42, borderRadius: 13,
    alignItems: "center", justifyContent: "center", marginRight: 13
  },
  networkSymbol: { color: "#07111F", fontWeight: "900", fontSize: 19 },
  networkName: { color: "white", fontWeight: "800", fontSize: 14 },
  networkHint: { color: MUTED, fontSize: 11, marginTop: 4 },
  arrow: { color: MUTED, fontSize: 27, paddingHorizontal: 5 },
  notice: { backgroundColor: CARD, borderRadius: 17, padding: 17, marginTop: 12, marginBottom: 25 },
  noticeTitle: { color: "white", fontWeight: "800", fontSize: 15 },
  noticeText: { color: MUTED, fontSize: 12, marginTop: 6 },
  noticeLink: { color: "#62A1FF", fontWeight: "800", marginTop: 12 },
  nav: {
    flexDirection: "row", justifyContent: "space-around",
    borderTopWidth: 1, borderTopColor: "#1B2B40",
    paddingTop: 12, paddingBottom: 8
  },
  navItem: { alignItems: "center", gap: 4, flex: 1 },
  navIcon: { color: MUTED, fontSize: 22 },
  navLabel: { color: MUTED, fontSize: 10 },
  active: { color: "#62A1FF", fontWeight: "900" },
  otherPage: { flex: 1, paddingTop: 25 },
  otherText: { color: MUTED, fontSize: 14, lineHeight: 22, marginTop: 12 },
  primaryButton: { backgroundColor: BLUE, borderRadius: 14, padding: 16, marginTop: 25, alignItems: "center" },
  primaryText: { color: "white", fontWeight: "900" }
});
