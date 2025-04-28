import {Card} from '@/components/ui/card';
import Link from 'next/link';
import {CircleArrowLeft, Settings} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

type Props = {
  imageUrl?: string;
  name: string;
  options?: {
    label: string;
    destructive: boolean;
    onClick?: () => void;
  }[]
}

const Header = ({imageUrl, name, options}: Props) => {
  return (
      <Card
          className={'w-full flex rounded-lg justify-between items-center p-2 flex-row'}>
        <div className="flex items-center gap-2 self-start">
          <Link href={'/conversations'} className={'block lg:hidden'}>
            <CircleArrowLeft/>
          </Link>
          <Avatar className={'h-8 w-8'}>
            <AvatarImage src={imageUrl}/>
            <AvatarFallback>
              {name.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <h2 className="font-semibold">
            {name}
          </h2>
        </div>
        <div className="flex gap-2 self-end">
          {options
              ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size={'icon'} variant={'secondary'}>
                        <Settings/>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {options.map((option, id) => (
                          <DropdownMenuItem
                              key={id}
                              onClick={option.onClick}
                              className={cn('font-semibold', {
                                'text-destructive': option.destructive
                              })}
                          >
                            {option.label}
                          </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
              )
              : null
          }
        </div>
      </Card>
  );
};

export default Header;