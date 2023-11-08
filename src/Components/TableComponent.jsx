import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FormComponent from "./FormComponent";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import format from "date-fns/format";
import Image from "next/image";
import userPlaceholder from "../assets/pngs/user-placeholder.png";
import { connect } from "react-redux";

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(/^[A-Za-z\s]*$/, "Only alphabets and white space allowed")
    .min(1, "Please enter a first name more than 1 character")
    .max(15, "Text must be at most 15 characters")
    .required("Text is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+$/,
      "Password must contain at least one alphabet, one digit, and one special character"
    ),
  address: yup
    .string()
    .required("Address is required")
    .max(500, "You can not write more than 500 character"),
  file: yup.mixed().required("File is required"),
});

const TableComponent = ({
  tableData,
  setTableData,
  editDataItemIndex,
  setEditDataItemIndex,
  editTableDataItem,
  setEditTableDataItem,
  deleteDataItemIndex,
  setDeleteDataItemIndex,
}) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [imageArray, setImageArray] = useState([]);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      city: "",
      state: "",
      date: new Date(),
      age: 0,
      address: "",
      file: "",
      color: "#fff",
      status: false,
    },
  });

  useEffect(() => {
    reset({
      name: editTableDataItem?.name ? editTableDataItem?.name : "",
      email: editTableDataItem?.email ? editTableDataItem?.email : "",
      password: editTableDataItem?.password ? editTableDataItem?.password : "",
      city: editTableDataItem?.city ? editTableDataItem?.city : "",
      state: editTableDataItem?.state ? editTableDataItem?.state : "",
      date: editTableDataItem?.date ? editTableDataItem?.date : new Date(),
      age: editTableDataItem?.age ? editTableDataItem?.age : 0,
      address: editTableDataItem?.address ? editTableDataItem?.address : "",
      file: "",
      color: editTableDataItem?.color ? editTableDataItem?.color : "#fff",
      status: editTableDataItem?.status ? editTableDataItem?.status : false,
    });
  }, [editTableDataItem]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.size > 2000000) {
      setFileSizeError(true);
    } else {
      setFileSizeError(false);
    }
  };

  const handleDeleteItem = (index) => {
    setDeleteDataItemIndex(index);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteItem = () => {
    const updatedItems = tableData?.filter((_, i) => i !== deleteDataItemIndex);
    setTableData(updatedItems);
    setOpenDeleteDialog(false);
    setDeleteDataItemIndex(null);
    setImageArray([]);
  };

  const handleEditItem = (index) => {
    setEditDataItemIndex(index);
    setEditTableDataItem(tableData[index]);
    setOpenEditDialog(true);
  };

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImageArray((prevArray) => [...prevArray, { file: selectedFile }]);
    }
  };

  const onSubmit = (data, isEdit) => {
    const combineData = { ...data, file: imageArray };

    if (combineData) {
      if (isEdit) {
        const updatedItems = [...tableData];
        updatedItems[editDataItemIndex] = combineData;
        setTableData(updatedItems);
        setOpenEditDialog(false);
        setEditDataItemIndex(null);
        setEditTableDataItem(null);
        setImageArray([]);
        reset();
      } else {
        setTableData([...tableData, combineData]);
        setOpenAddDialog(false);
        reset();
        setImageArray([]);
      }
    }
  };

  return (
    <Box sx={{ display: "inline-block", width: "100%", mt: 10 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Data Table</Typography>

        <Box sx={{ display: "flex" }}>
          <Button
            onClick={() => {
              setOpenAddDialog(true);
              reset();
              setEditTableDataItem(null);
              setImageArray([]);
            }}
            variant="contained"
            color="primary"
          >
            Add New Item
          </Button>
        </Box>
      </Box>

      <>
        <TableContainer component={Paper} sx={{ minHeight: "200px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "150px" }}>Profile Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell>City</TableCell>
                <TableCell>State</TableCell>
                <TableCell sx={{ width: "150px" }}>Date</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Favourite Color</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            {tableData && tableData?.length > 0 && (
              <TableBody>
                {tableData?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box
                        sx={{
                          display: "inline-block",
                          img: { borderRadius: "50px" },
                        }}
                      >
                        <Image
                          src={
                            item?.file?.length > 0
                              ? URL.createObjectURL(item?.file[0]?.file)
                              : userPlaceholder
                          }
                          alt="Picture of the author"
                          width={50}
                          height={50}
                          objectFit="cover"
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{item?.name ? item?.name : "-"}</TableCell>
                    <TableCell>{item?.email ? item?.email : "-"}</TableCell>
                    <TableCell>
                      {item?.password ? item?.password : "-"}
                    </TableCell>
                    <TableCell>{item?.city ? item?.city : "-"}</TableCell>
                    <TableCell>{item?.state ? item?.state : "-"}</TableCell>
                    <TableCell>
                      {item?.date
                        ? format(new Date(item?.date), "dd-MM-yyyy")
                        : "-"}
                    </TableCell>
                    <TableCell>{item?.age ? item?.age : "-"}</TableCell>
                    <TableCell>{item?.address ? item?.address : "-"}</TableCell>
                    <TableCell>
                      {item?.color ? (
                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Typography variant="body1">{item?.color}</Typography>

                          <Box
                            sx={{
                              background: item?.color,
                              height: "22px",
                              width: "22px",
                              borderRadius: "50px",
                              border: "1px solid black",
                            }}
                          ></Box>
                        </Box>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>{item?.status ? "Yes" : "No"}</TableCell>

                    <TableCell>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                          onClick={() => handleEditItem(index)}
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteItem(index)}
                          variant="contained"
                          color="error"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>

          {tableData?.length === 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
              <Typography variant="subtitle1">No data found !</Typography>
            </Box>
          )}
        </TableContainer>

        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogContent>
            <FormComponent
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              control={control}
              setValue={setValue}
              watch={watch}
              ModalCloseHandler={() => setOpenEditDialog(false)}
              errors={errors}
              handleFileChange={handleFileChange}
              fileSizeError={fileSizeError}
              openEditDialog={openEditDialog}
              reset={reset}
              setImageArray={setImageArray}
              onFileChange={onFileChange}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
          <DialogTitle>Add New Item</DialogTitle>

          <DialogContent>
            <FormComponent
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
              control={control}
              setValue={setValue}
              watch={watch}
              ModalCloseHandler={() => setOpenAddDialog(false)}
              errors={errors}
              handleFileChange={handleFileChange}
              fileSizeError={fileSizeError}
              reset={reset}
              setImageArray={setImageArray}
              onFileChange={onFileChange}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this item?
          </DialogContent>

          <DialogActions>
            <Button
              onClick={confirmDeleteItem}
              variant="contained"
              color="primary"
            >
              Delete
            </Button>

            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  tableData: state?.tableData?.tableData,
  editDataItemIndex: state?.tableData?.editDataItemIndex,
  editTableDataItem: state?.tableData?.editTableDataItem,
  deleteDataItemIndex: state?.tableData?.deleteDataItemIndex,
});

const mapDispatchToProps = {
  setTableData: (data) => ({
    type: "GET_TABLE_DATA",
    payload: data,
  }),

  setEditDataItemIndex: (data) => ({
    type: "EDIT_TABLE_DATA_INDEX",
    payload: data,
  }),

  setEditTableDataItem: (data) => ({
    type: "EDIT_TABLE_DATA_ITEM",
    payload: data,
  }),

  setDeleteDataItemIndex: (data) => ({
    type: "DELETE_TABLE_DATA_INDEX",
    payload: data,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
