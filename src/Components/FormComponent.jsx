import { DatePicker } from "@mui/x-date-pickers";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ColorPickerInput from "./ColorPickerInput";

const CitySelectData = [
  { label: "Navsari", value: "Navsari" },
  { label: "Surat", value: "Surat" },
  { label: "Ahmedabad", value: "Ahmedabad" },
  { label: "Pune", value: "Pune" },
  { label: "Mumbai", value: "Mumbai" },
];

const StateSelectData = [
  { label: "Gujarat", value: "Gujarat" },
  { label: "Maharastra", value: "Maharastra" },
];

const FormComponent = ({
  onSubmit,
  handleSubmit,
  control,
  setValue,
  watch,
  ModalCloseHandler,
  errors,
  handleFileChange,
  fileSizeError,
  openEditDialog,
  reset,
  onFileChange,
  setImageArray,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 2,
        ".MuiFormHelperText-root": { color: "red" },
      }}
    >
      <form
        onSubmit={handleSubmit((data) =>
          onSubmit(data, openEditDialog ? true : false)
        )}
      >
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
              helperText={errors.name?.message}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
              type="password"
              helperText={errors.password?.message}
            />
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
              <InputLabel id="city-select-label">City</InputLabel>
              <Select {...field} labelId="city-select-label" label="City">
                {CitySelectData &&
                  CitySelectData?.map((item) => (
                    <MenuItem value={item?.value} key={item?.value}>
                      {item?.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        />

        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
              <InputLabel id="state-select-label">State</InputLabel>
              <Select {...field} labelId="state-select-label" label="State">
                {StateSelectData &&
                  StateSelectData?.map((item) => (
                    <MenuItem value={item?.value} key={item?.value}>
                      {item?.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        />

        <InputLabel sx={{ mb: 1 }}>Date</InputLabel>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
              <DatePicker
                value={field.value}
                onChange={(date) => field.onChange(date)}
                renderInput={(props) => <TextField {...props} />}
              />
            </FormControl>
          )}
        />

        <InputLabel sx={{ mb: 1 }}>Age</InputLabel>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <Slider
              {...field}
              aria-label="Default"
              valueLabelDisplay="auto"
              fullWidth
              sx={{ mb: 3 }}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              variant="outlined"
              fullWidth
              sx={{ mb: 4 }}
              multiline
              rows={3}
              helperText={errors.address?.message}
            />
          )}
        />

        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              required
              type="file"
              fullWidth
              variant="outlined"
              label="Profile Image"
              sx={{ mb: fileSizeError ? 0.5 : 3 }}
              InputProps={{
                startAdornment: (
                  <AttachFileIcon color="primary" style={{ fontSize: 24 }} />
                ),
              }}
              inputProps={{
                accept: ".jpg, .jpeg, .png", // Accept only image formats
                onBlur: handleFileChange,
                onChange: onFileChange,
              }}
              helperText={errors.file?.message}
            />
          )}
        />

        {fileSizeError && (
          <FormHelperText sx={{ mb: 3, mx: "14px" }}>
            File size exceeds the maximum limit (2MB).
          </FormHelperText>
        )}

        <InputLabel sx={{ mb: 1 }}>Favourite Color</InputLabel>
        <ColorPickerInput
          name="color"
          control={control}
          watch={watch}
          setValue={setValue}
        />

        <InputLabel sx={{ mb: 1, mt: 3 }}>Status</InputLabel>
        <Controller
          name="status"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Switch {...field} inputProps={{ "aria-label": "Toggle switch" }} />
          )}
        />

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 1 }}
        >
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>

          <Button
            onClick={() => {
              ModalCloseHandler();
              reset();
              setImageArray([]);
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormComponent;
