import { useForm } from 'react-hook-form';
import { NavigationItem } from './types';

interface EditFormProps {
  item: NavigationItem;
  onEdit: (updatedItem: NavigationItem) => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ item, onEdit, onClose }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { label: item.label, url: item.url },
  });

  const onSubmit = (data: Omit<NavigationItem, 'id'>) => {
    onEdit({ ...item, ...data });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block">Label</label>
        <input {...register('label')} className="border rounded w-full p-2" />
      </div>
      <div>
        <label className="block">URL</label>
        <input {...register('url')} className="border rounded w-full p-2" />
      </div>
      <div className="flex space-x-2">
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Save</button>
        <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
      </div>
    </form>
  );
};

export default EditForm;
