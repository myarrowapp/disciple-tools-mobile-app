import React, { useRef } from "react";

//Components
import { Pressable, View, Text, TextInput } from "react-native";

//Hooks
import useI18N from "hooks/use-i18n";

//Styles
import useStyles from "hooks/use-styles";
import { localStyles } from "./LabeledTextInput.styles";

export const LabeledTextInput = (props) => {
  const { startIcon, endIcon, error, i18nKey } = props;

  const { styles } = useStyles(localStyles);
  const { isRTL, i18n } = useI18N();
  const inputRef = useRef(null);

  const text = React.useMemo(() => i18n.t(i18nKey), [i18nKey]);

  return (
    <Pressable
      style={[styles.inputContainer, styles.textField]}
      onPress={() => inputRef.current?.focus()}
    >
      <Text style={[styles.inputLabelText]}>{text}</Text>
      <View style={[styles.inputRow, { alignItems: "center" }]}>
        {startIcon}
        <TextInput
          ref={inputRef}
          style={[styles.inputRowTextInput]}
          accessibilityLabel={text}
          textAlign={isRTL ? "right" : "left"}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          {...props}
        />
        {endIcon}
      </View>
      {error && (
        <Text style={styles.validationErrorMessage}>
          {i18n.t("global.error.isRequired", { item: text })}
        </Text>
      )}
    </Pressable>
  );
};
