import { AppHeader } from '@/components/AppHeader';
import { RouterCloseIcon } from '@/components/router/RouterCloseIcon';
import { ScreenLayout } from '@/components/ScreenLayout';
import { Colors } from '@/constants/Colors';

const AddTimezoneScreen = () => {
  return (
    <ScreenLayout includeBottomSafeArea={false}>
      <AppHeader
        contentLeft={<RouterCloseIcon />}
        backgroundColor={Colors.light.tint}
        title={'Add Timezones'}
        shouldRenderSafeArea={false}
      />
    </ScreenLayout>
  );
};

export default AddTimezoneScreen;
