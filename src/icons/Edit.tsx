import Svg, { SvgProps, Path } from 'react-native-svg';
export const EditIcon = (props: SvgProps) => (
    <Svg
        width={25}
        height={25}
        viewBox="0 -0.5 21 21"
        {...props}
    >
        <Path
            fill="#000"
            fillRule="evenodd"
            d="M18.9 18.01H2.1V2.097h8.4V.106H0V20h21v-9.947h-2.1v7.958ZM6.3 9.95 16.63 0 21 4.115l-10.666 9.917H6.3V9.95Z"
        />
    </Svg>
);
