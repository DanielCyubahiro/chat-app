'use client';

import {Card} from '@/components/ui/card';
import {UserButton} from '@clerk/nextjs';
import {useNavigation} from '@/hooks/useNavigation';
import Link from 'next/link';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip';
import {Button} from '@/components/ui/button';
import {useConversation} from '@/hooks/useConversation';
import {Badge} from '@/components/ui/badge';

const MobileNav = () => {
  const paths = useNavigation();
  const {isActive} = useConversation();
  if (isActive) return null;
  return (
      <Card
          className={'fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden'}
      >
        <nav className={'w-full'}>
          <ul className={'flex justify-evenly items-center'}>
            {paths.map((path, id) => (
                <li key={id} className={'relative'}>
                  <Link href={path.href}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button size={'icon'}
                                  variant={path.active ? 'default' : 'outline'}>
                            {path.icon}
                          </Button>
                          {path.count
                              ? <Badge
                                  className={'absolute left-7 bottom-6 px-2'}>
                                {path.count}
                              </Badge>
                              : null}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{path.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </li>
            ))}
            <li>
              <UserButton/>
            </li>
          </ul>
        </nav>
      </Card>
  );
};

export default MobileNav;