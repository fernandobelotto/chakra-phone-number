import { ChakraProvider, Button, Box, Text, Stack } from "@chakra-ui/react";
import { PhoneNumberInput } from "./PhoneNumberInput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";

const schema = yup.object().shape({
  phone: yup.string().phone().required()
});

export default function App() {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <ChakraProvider>
      <div>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
      {/* Form validation */}
      <Box px="8" m="8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange } }) => (
                <PhoneNumberInput onChange={onChange} />
              )}
            />
            <Text as="small" color="red">
              {errors.phone && errors.phone.message}
            </Text>
          </Stack>

          <Button
            type="submit"
            my="4"
            isDisabled={!isValid}
            loadingText="Submitting"
          >
            SEND
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
}
