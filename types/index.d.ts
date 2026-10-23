// CREDITS: These types are based on the original work made by all the people who contributed to @types/react-native

import * as React from 'react';
import * as ReactNative from 'react-native';

interface MaskedViewProps extends ReactNative.ViewProps {
  maskElement: React.ReactElement;
  androidRenderingMode?: 'software' | 'hardware';
}
/**
 * @see https://github.com/react-native-masked-view/masked-view
 */
declare class MaskedViewComponent extends React.Component<MaskedViewProps> {}
export default class MaskedView extends MaskedViewComponent {}
