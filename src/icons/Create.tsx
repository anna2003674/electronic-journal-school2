import Svg, { SvgProps, Path } from 'react-native-svg';
export const CreateIcon = (props: SvgProps) => (
    <Svg
        width={25}
        height={25}
        fill="none"
        viewBox="0 0 24 24"
        {...props}
    >
        <Path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 12h16m-8-8v16"
        />
    </Svg>
);
