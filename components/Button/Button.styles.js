export const localStyles = ({ theme, isRTL, isIOS }) => ({
  container: {
    backgroundColor: theme.brand.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.highlight,
    marginTop: 10,
    height: 50,
  },
  text: {
    color: theme.offLight,
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  spinner: {
    margin: 20,
  },
});
