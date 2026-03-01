import { Platform, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg';

type TrainyTitleProps = {
  fontSize?: number;
  fontWeight?: '400' | '500' | '600' | '700' | '800';
  letterSpacing?: number;
};

export function TrainyTitle({
  fontSize = 24,
  fontWeight = '800',
  letterSpacing,
}: TrainyTitleProps) {
  const defaultLetterSpacing = letterSpacing ?? fontSize * -0.05;
  const svgHeight = fontSize * 1.5;
  const textY = fontSize * 1.1;

  return (
    <View style={styles.container}>
      <Svg height={svgHeight} width={100} style={styles.svg}>
        <Defs>
          <LinearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="rgba(248, 148, 104, 1)" />
            <Stop offset="100%" stopColor="rgba(255, 176, 142, 1)" />
          </LinearGradient>
        </Defs>
        <SvgText
          x="0"
          y={textY}
          fontSize={fontSize.toString()}
          fontWeight={fontWeight}
          letterSpacing={defaultLetterSpacing.toString()}
          fill="url(#titleGradient)"
          fontFamily={Platform.OS === 'ios' ? 'Inter' : 'sans-serif'}>
          Trainy
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  svg: {
    alignSelf: 'flex-start',
  },
});
