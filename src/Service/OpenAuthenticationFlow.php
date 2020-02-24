<?php declare(strict_types=1);

namespace Heptacom\AdminOpenAuth\Service;

use Heptacom\AdminOpenAuth\Database\ClientEntity;
use Heptacom\AdminOpenAuth\Database\LoginEntity;
use Heptacom\AdminOpenAuth\Exception\LoadClientException;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Uuid\Uuid;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Routing\RouterInterface;

class OpenAuthenticationFlow
{
    /**
     * @var Login
     */
    private $login;

    /**
     * @var ClientLoader
     */
    private $clientLoader;

    /**
     * @var UserResolver
     */
    private $userResolver;

    /**
     * @var EntityRepositoryInterface
     */
    private $clientsRepository;

    /**
     * @var RouterInterface
     */
    private $router;

    public function __construct(
        Login $login,
        ClientLoader $clientLoader,
        UserResolver $userResolver,
        EntityRepositoryInterface $clientsRepository,
        RouterInterface $router
    ) {
        $this->login = $login;
        $this->clientLoader = $clientLoader;
        $this->userResolver = $userResolver;
        $this->clientsRepository = $clientsRepository;
        $this->router = $router;
    }

    /**
     * @throws LoadClientException
     */
    public function getRedirectUrl(string $clientId, Context $context): string
    {
        $state = Uuid::randomHex();
        $this->login->initiate($clientId, $state, $context);

        return $this->clientLoader->load($clientId, $context)->getLoginUrl($state);
    }

    /**
     * @throws LoadClientException
     */
    public function upsertUser(string $clientId, string $state, string $code, Context $context): void
    {
        $user = $this->clientLoader->load($clientId, $context)->getUser($state, $code);
        $this->userResolver->resolve($user, $state, $clientId, $context);
    }

    public function popCredentials(string $state, Context $context): ?array
    {
        $login = $this->login->pop($state, $context);

        if (!$login instanceof LoginEntity) {
            return null;
        }

        return [
            'username' => $login->getUser()->getUsername(),
            'password' => $login->getPassword(),
        ];
    }

    public function getLoginRoutes(Context $context): array
    {
        return array_values($this->clientsRepository
            ->search(new Criteria(), $context)
            ->getEntities()
            ->map(function (ClientEntity $client): array {
                return [
                    'name' => $client->getName(),
                    'url' => $this->router->generate(
                        'administration.heptacom.admin_open_auth.remote_login',
                        ['clientId' => $client->getId()],
                        UrlGeneratorInterface::ABSOLUTE_URL
                    ),
                ];
            }));
    }
}
