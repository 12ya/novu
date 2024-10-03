import { Badge } from '@/components/primitives/badge';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationStart,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationEnd,
} from '@/components/primitives/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/primitives/select';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/primitives/table';
import { WorkflowSteps } from '@/components/workflow-steps';
import { WorkflowTags } from '@/components/workflow-tags';
import { StepTypeEnum, type WorkflowListResponseDto } from '@novu/shared';

const testData: WorkflowListResponseDto[] = [
  {
    _id: '0001-4949',
    name: 'Test Name 1',
    createdAt: '2024-06-30T08:09:40.546Z',
    updatedAt: '2024-07-02T08:09:40.546Z',
    stepTypeOverviews: [StepTypeEnum.IN_APP, StepTypeEnum.PUSH],
    tags: ['tag2', 'tag10'],
  },
  {
    _id: '0002-6338',
    name: 'Test Name 2',
    createdAt: '2024-07-13T08:09:40.546Z',
    updatedAt: '2024-07-28T08:09:40.546Z',
    stepTypeOverviews: [StepTypeEnum.EMAIL, StepTypeEnum.CUSTOM],
    tags: ['tag5', 'tag10'],
  },
  {
    _id: '0003-5945',
    name: 'Test Name 3',
    createdAt: '2024-08-22T08:09:40.546Z',
    updatedAt: '2024-09-15T08:09:40.546Z',
    stepTypeOverviews: [StepTypeEnum.PUSH],
    tags: ['tag4', 'tag9', 'tag10', 'tag11'],
  },
  {
    _id: '0004-9007',
    name: 'Test Name 4',
    createdAt: '2024-09-19T08:09:40.546Z',
    updatedAt: '2024-10-10T08:09:40.546Z',
    stepTypeOverviews: [StepTypeEnum.PUSH, StepTypeEnum.TRIGGER, StepTypeEnum.EMAIL],
    tags: ['tag4', 'tag10', 'tag10'],
  },
  {
    _id: '0005-8583',
    name: 'Test Name 5',
    createdAt: '2024-08-12T08:09:40.546Z',
    updatedAt: '2024-08-15T08:09:40.546Z',
    stepTypeOverviews: [StepTypeEnum.EMAIL, StepTypeEnum.SMS, StepTypeEnum.IN_APP],
    tags: ['tag4', 'tag9'],
  },
  {
    _id: '0006-1234',
    name: 'Test Name 6',
    createdAt: '2024-09-01T08:09:40.546Z',
    updatedAt: '2024-09-14T08:09:40.546Z',
    stepTypeOverviews: [StepTypeEnum.CUSTOM, StepTypeEnum.CHAT],
    tags: ['tag1', 'tag7'],
  },
  {
    _id: '0007-5678',
    name: 'Test Name 7',
    createdAt: '2024-07-29T08:09:40.546Z',
    updatedAt: '2024-08-10T08:09:40.546Z',
    stepTypeOverviews: [StepTypeEnum.SMS, StepTypeEnum.DIGEST],
    tags: ['tag3', 'tag8'],
  },
  {
    _id: '0008-9832',
    name: 'Test Name 8',
    createdAt: '2024-06-05T08:09:40.546Z',
    updatedAt: '2024-06-22T08:09:40.546Z',
    stepTypeOverviews: [StepTypeEnum.IN_APP, StepTypeEnum.PUSH, StepTypeEnum.DIGEST, StepTypeEnum.CHAT],
    tags: ['tag5', 'tag9'],
  },
  {
    _id: '0009-6214',
    name: 'Test Name 9',
    createdAt: '2024-08-17T08:09:40.546Z',
    updatedAt: '2024-09-03T08:09:40.546Z',
    stepTypeOverviews: [
      StepTypeEnum.TRIGGER,
      StepTypeEnum.PUSH,
      StepTypeEnum.CUSTOM,
      StepTypeEnum.EMAIL,
      StepTypeEnum.IN_APP,
    ],
    tags: ['tag2', 'tag6'],
  },
  {
    _id: '0010-4376',
    name: 'Test Name 10',
    createdAt: '2024-05-25T08:09:40.546Z',
    updatedAt: '2024-06-01T08:09:40.546Z',
    stepTypeOverviews: [StepTypeEnum.EMAIL, StepTypeEnum.DELAY, StepTypeEnum.SMS],
    tags: ['tag1', 'tag10'],
  },
  {
    _id: '0011-7482',
    name: 'Test Name 11',
    createdAt: '2024-09-05T08:09:40.546Z',
    updatedAt: '2024-09-15T08:09:40.546Z',
    stepTypeOverviews: [StepTypeEnum.EMAIL, StepTypeEnum.IN_APP],
    tags: ['tag3', 'tag7'],
  },
  {
    _id: '0012-1834',
    name: 'Test Name 12',
    createdAt: '2024-07-01T08:09:40.546Z',
    updatedAt: '2024-07-12T08:09:40.546Z',
    stepTypeOverviews: [StepTypeEnum.CUSTOM, StepTypeEnum.TRIGGER],
    tags: ['tag4', 'tag6'],
  },
  {
    _id: '0013-5427',
    name: 'Test Name 13',
    createdAt: '2024-06-17T08:09:40.546Z',
    updatedAt: '2024-07-03T08:09:40.546Z',
    stepTypeOverviews: [StepTypeEnum.DIGEST, StepTypeEnum.PUSH],
    tags: ['tag2', 'tag9'],
  },
  {
    _id: '0014-2976',
    name: 'Test Name 14',
    createdAt: '2024-09-23T08:09:40.546Z',
    updatedAt: '2024-10-01T08:09:40.546Z',
    stepTypeOverviews: [StepTypeEnum.DELAY, StepTypeEnum.PUSH, StepTypeEnum.CHAT],
    tags: ['tag5', 'tag8'],
  },
  {
    _id: '0015-4261',
    name: 'Test Name 15',
    createdAt: '2024-04-15T08:09:40.546Z',
    updatedAt: '2024-05-02T08:09:40.546Z',
    stepTypeOverviews: [StepTypeEnum.SMS, StepTypeEnum.DIGEST, StepTypeEnum.TRIGGER],
    tags: ['tag1', 'tag6'],
  },
];

export const WorkflowList = () => {
  const workflows = testData; //this will be replaced with the api call

  return (
    <div className="px-6 py-2">
      <Table containerClassname="max-h-[750px]">
        <TableHeader>
          <TableRow>
            <TableHead>Workflows</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Steps</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Last updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workflows.map((workflow) => (
            <TableRow>
              <TableCell className="font-medium">
                <p>{workflow.name}</p>
                <p className="text-foreground-400 font-code text-xs">{workflow._id}</p>
              </TableCell>
              <TableCell>
                <Badge variant={'success'}>Active</Badge>
              </TableCell>
              <TableCell>
                <WorkflowSteps steps={workflow.stepTypeOverviews} />
              </TableCell>
              <TableCell>
                <WorkflowTags tags={workflow.tags || []} />
              </TableCell>
              <TableCell>{workflow.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>
              <div className="flex items-center justify-between">
                <p className="text-foreground-600 text-sm font-normal">Page X of Y</p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationStart href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">15</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEnd href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <Select>
                  <SelectTrigger className="w-fit">
                    <SelectValue placeholder="12 / page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 / page</SelectItem>
                    <SelectItem value="14">14 / page</SelectItem>
                    <SelectItem value="16">16 / page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
