import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

const modes = ['auto', 'none', 'box-only', 'box-none', 'unset'];
const empty = () => ({
  plain: { child: 0, box: 0, behind: 0 },
  masked: { child: 0, box: 0, behind: 0 },
});
export default function MaskedViewPointerEventsExample() {
  const [mode, setMode] = useState('auto');
  const [counts, setCounts] = useState(empty);
  const hit = (kind, target) =>
    setCounts(old => ({
      ...old,
      [kind]: { ...old[kind], [target]: old[kind][target] + 1 },
    }));
  const pointerEvents = mode === 'unset' ? undefined : mode;
  const panel = kind => {
    const Box = kind === 'masked' ? MaskedView : View;
    return (
      <View style={styles.column}>
        <Text style={styles.title}>
          {kind === 'masked' ? 'MaskedView' : 'Plain View'}
        </Text>
        <View style={styles.stage}>
          <Pressable
            accessibilityLabel={`${kind} behind`}
            style={StyleSheet.absoluteFill}
            onPress={() => hit(kind, 'behind')}
          />
          <Box
            {...(kind === 'masked'
              ? {
                  maskElement: <View style={styles.mask} />,
                }
              : {})}
            pointerEvents={pointerEvents}
            onStartShouldSetResponder={() => true}
            onResponderRelease={() => hit(kind, 'box')}
            style={[StyleSheet.absoluteFill, styles.box]}
          >
            <Pressable
              accessibilityLabel={`${kind} child`}
              style={styles.child}
              onPress={() => hit(kind, 'child')}
            >
              <Text>{kind} child</Text>
            </Pressable>
            <View pointerEvents="none" style={styles.gap}>
              <Text accessibilityLabel={`${kind} gap`}>{kind} gap</Text>
            </View>
          </Box>
        </View>
        <Text accessibilityLabel={`${kind} counters`}>
          child {counts[kind].child} box {counts[kind].box} behind{' '}
          {counts[kind].behind}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>MaskedView pointerEvents</Text>
      <Text>Tap each child and gap, then compare the counters.</Text>
      <Text accessibilityLabel="selected mode">Mode: {mode}</Text>
      <View style={styles.buttons}>
        {modes.map(item => (
          <Pressable
            key={item}
            accessibilityLabel={`mode ${item}`}
            onPress={() => {
              setMode(item);
              setCounts(empty());
            }}
            style={styles.button}
          >
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.row}>
        {panel('plain')}
        {panel('masked')}
      </View>
      <Pressable
        accessibilityLabel="reset counters"
        onPress={() => setCounts(empty())}
        style={styles.button}
      >
        <Text>Reset counters</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  mask: { flex: 1, backgroundColor: 'black', borderRadius: 18 },
  screen: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 48,
    backgroundColor: '#fff',
  },
  heading: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 18,
  },
  button: {
    padding: 12,
    backgroundColor: '#dbeafe',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  row: { flexDirection: 'row', gap: 14, marginBottom: 22 },
  column: { flex: 1, gap: 10 },
  title: { fontSize: 18, fontWeight: '600' },
  stage: { height: 240, backgroundColor: '#fef3c7' },
  box: { backgroundColor: '#e5e7eb' },
  child: {
    position: 'absolute',
    top: 28,
    left: 18,
    right: 18,
    height: 64,
    backgroundColor: '#93c5fd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gap: {
    position: 'absolute',
    top: 155,
    left: 18,
    right: 18,
    alignItems: 'center',
  },
});
