/**
 * App path type
 *
 * NOTE: Cannot use enums (crash Vue JS compilation)
 */
type AppPath = "appData" | "userData";

export interface Snackbar {
  buttonIcon?: string | null;
  buttonText?: string | null;
  closeable?: boolean;
  onClick?: () => void;
  permanent?: boolean;
  text: string;
  timeout?: number;
  type?: string | null;
  visible: boolean;
}

export { AppPath };
