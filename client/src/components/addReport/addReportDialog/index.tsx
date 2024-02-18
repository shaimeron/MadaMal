import {Button, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";
import {FC, useCallback, useEffect} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {FieldValues, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useAppSelector} from "@/hooks/store";
import {closeDialog, selectReportDialogStatus} from "@/store/addReport";
import {AddReportFormData, defaultFormValues, EAddReportFields, schema,} from "../formUtils";
import {useAddDialog} from "./hooks/useAddDialog";
import {AddReportFormBody} from "../addReportFormBody";
import {LoadingButton} from "@mui/lab";

export const AddReportDialog: FC = () => {
  const isOpen: boolean = useAppSelector(selectReportDialogStatus);
  const {
    getReportForForm,
    handeSave,
    handleWrongFormData,
    titleText,
    submitText,
    isButtonLoading,
  } = useAddDialog();
  const dispatch = useDispatch();

  const { handleSubmit, control, reset } = useForm<AddReportFormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
    resetOptions: {
      keepDirtyValues: false,
    },
  });

  useEffect(() => {
    const func = async () => {
      if (isOpen) {
        const reportForForm = await getReportForForm();
        reset(reportForForm);
      }
    };

    func();
  }, [getReportForForm, isOpen, reset]);

  const handleClose = useCallback(() => {
    if (isOpen) {
      reset();
      dispatch(closeDialog());
    }
  }, [dispatch, isOpen, reset]);

  const onSubmit = useCallback(
    async (form: FieldValues): Promise<void> => {
      const isSaved = await handeSave(
        form[EAddReportFields.DATA],
        form[EAddReportFields.IMAGE],
        form[EAddReportFields.DEFAULT_IMAGE_NAME]
      );
      isSaved && handleClose();
    },
    [handeSave, handleClose]
  );

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(onSubmit, handleWrongFormData),
      }}
    >
      <DialogTitle>{titleText}</DialogTitle>
      <DialogContent>
        <AddReportFormBody control={control} />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={handleClose}
          disabled={isButtonLoading}
        >
          בטל
        </Button>
        <LoadingButton
          loading={isButtonLoading}
          role="progressbar"
          variant="contained"
          color="success"
          type="submit"
        >
          <span>{submitText}</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
