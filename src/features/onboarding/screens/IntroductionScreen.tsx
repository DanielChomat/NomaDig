import {Paragraph, styled, Text, YStack} from "tamagui";
import {Screen} from "../../../components/Screen";

export const Heading = styled(Paragraph, {
    tag: 'span',
    name: 'Heading',
    role: 'heading',
    fontFamily: '$heading',
    fontWeight: '400',
    size: '$8',
    margin: 0,
})

export const IntroductionScreen = () => {
    return <Screen>
        <YStack alignItems={'center'}>
            <Text fontSize={'$2'} fontWeight={'400'}>recognition</Text>
            <Text fontSize={'$2'}>recognition</Text>
            <Heading>NOMADIG</Heading>
        </YStack>
        <Text fontWeight={'400'}>IntroductionScreen</Text>
    </Screen>
}