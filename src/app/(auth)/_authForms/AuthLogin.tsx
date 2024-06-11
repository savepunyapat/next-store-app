import {
  Stack,
  Typography,
  InputAdornment,
  Box,
  Button,
  Divider,
  Alert,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import { loginType } from "@/app/(auth)/types/auth";
import CustomCheckbox from "@/app/components/forms/theme-elements/CustomCheckbox";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import AuthSocialButtons from "./AuthSocialButtons";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//import actions
import { login } from "@/app/services/actions/authAction";

type User = {
  username: string;
  password: string;
};

export default function AuthLogin({ title, subtitle, subtext }: loginType) {
  const initialValue: User = {
    username: "punyapatadmin2",
    password: "AdminSave2@1234",
  };
  const router = useRouter();
  //form validation
  const formValidateSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").trim(),
    password: Yup.string().required("Password is required").trim(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: initialValue,
    resolver: yupResolver(formValidateSchema),
  });

  const onSubmitLogin = async (data: User) => {
    const response = await login(data);
    if(response.success) {
      router.push("/backend/dashboard");
    }else{
      console.log("Login Failed", response.error);
    }

  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Sign in with" />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
      </Box>
      <form
        onSubmit={handleSubmit(onSubmitLogin)}
        noValidate
        autoComplete="off"
      >
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  id="username"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icons.Person />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="username"
                  autoFocus
                  error={(errors.username?.message ?? "") != ""}
                  // helperText={errors.username?.message?.toString()}
                />
              )}
            />
            {errors.username?.message ? (
              <Alert severity="error">{errors.username?.message}</Alert>
            ) : null}
          </Box>

          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  id="password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icons.Lock />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="password"
                  error={(errors.password?.message ?? "") != ""}
                />
              )}
            />
            {errors.password?.message ? (
              <Alert severity="error">{errors.password?.message}</Alert>
            ) : null}
          </Box>

          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label="Remeber this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/forgotpass"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
}
