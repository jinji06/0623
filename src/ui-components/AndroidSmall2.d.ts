/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { IconProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AndroidSmall2OverridesProps = {
    AndroidSmall2?: PrimitiveOverrideProps<ViewProps>;
    "Rectangle 1"?: PrimitiveOverrideProps<IconProps>;
    "\u30ED\u30B0\u30A4\u30F3"?: PrimitiveOverrideProps<TextProps>;
    "Rectangle 2"?: PrimitiveOverrideProps<IconProps>;
    "Rectangle 3"?: PrimitiveOverrideProps<IconProps>;
    "\u30B9\u30BF\u30C3\u30D5ID"?: PrimitiveOverrideProps<TextProps>;
    "\u30D1\u30B9\u30EF\u30FC\u30C9"?: PrimitiveOverrideProps<TextProps>;
    "\u30BF\u30A4\u30C8\u30EB"?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type AndroidSmall2Props = React.PropsWithChildren<Partial<ViewProps> & {
    overrides?: AndroidSmall2OverridesProps | undefined | null;
}>;
export default function AndroidSmall2(props: AndroidSmall2Props): React.ReactElement;
